const glob = require('glob');
const fs = require('fs');
const prependFile = require('prepend-file');
const path = require('path');
const filesystemTools = require('gluegun/filesystem');
const stringTools = require('gluegun/strings');
const printTools = require('gluegun/print');
const config = require('./mitosis.config');
const htmlTags = require('html-tags');
const compileCommand = require('@builder.io/mitosis-cli/dist/commands/compile');

function compile(filepath) {
  const file = path.parse(filepath);

  config.targets.forEach(async (target, i) => {
    const outPath = `${config.dest}/${target}`;
    const outFile = `${outPath}/${filepath.replace(`/${file.base}`, '')}.${config.extensions[i]}`;
    const isFirstCompilation = !fs.existsSync(`${outPath}/src`);

    if (isFirstCompilation) {
      fs.mkdirSync(`${outPath}/src`);
      fs.copyFileSync('./src/index.ts', `${outPath}/src/index.ts`);
      fs.copyFileSync('./README.md', `${outPath}/README.md`);
    }

    await compileCommand.run({
      parameters: {
        options: {
          from: 'mitosis',
          to: target,
          out: outFile,
          state: 'useState'
        },
        array: [filepath]
      },
      strings: stringTools.strings,
      filesystem: filesystemTools.filesystem,
      print: printTools.print
    });

    // Fix css imports
    const data = fs.readFileSync(outFile, 'utf8');
    const result = data.replace(/import \{\} from ("|')\.\/(.+)\.css("|')\;/g, "import '../../../src/$2/$2.css';");
    fs.writeFileSync(outFile, result, 'utf8');

    if (isFirstCompilation) {
      // Move Readme
      const data = fs.readFileSync('./README.md', 'utf8');
      const result = data.replace(/\/\{platform\}.+/g, `/${target + (target === 'webcomponent' ? 's' : '')}`);

      fs.writeFileSync(`${outPath}/README.md`, result, 'utf8');
    }

    if (target === 'angular') {
      // Add selector to angular
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data.replace(
        /selector: ?["|'](.+)["|']/,
        `selector: "${
          !htmlTags.includes(file.name.replace('.lite', '')) ? '$1,' : ''
        }[pa-$1]", exportAs: "pa-$1", encapsulation: 2`
      );
      fs.writeFileSync(outFile, result, 'utf8');
    }

    if (target === 'react') {
      // Add react import
      prependFile.sync(outFile, '//@ts-nocheck \n import React from "react"; \n');
    }

    if (target === 'solid') {
      // temporary fix to dont use useRef
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        .replace(/useRef\(\)/g, '(document.body as any) /* This is broken waiting for mitosis update */')
        .replace(/\, ?useRef/, '');
      fs.writeFileSync(outFile, result, 'utf8');
    }

    if (target === 'svelte' && isFirstCompilation) {
      // Add .svelte to index
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        .replace(/\'\;/g, ".svelte';")
        .replace(/\.css\.svelte/g, '.css')
        .replace(/helpers\.svelte/g, 'helpers');
      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    if (target === 'vue' && isFirstCompilation) {
      // Add .vue to index
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        .replace(/\'\;/g, ".vue';")
        .replace(/\.css\.vue/g, '.css')
        .replace(/helpers\.vue/g, 'helpers');
      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    if (target === 'webcomponent') {
      // Ignore types
      prependFile.sync(outFile, '//@ts-nocheck \n');

      // Make component exportable
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        .replace(/class /, 'export default class ')
        .replace(
          /customElements\.define\("(.*)",(.*)\);/g,
          'customElements.get("pa-$1") || customElements.define("pa-$1", $2);'
        )
        .replace(/class=/g, 'part=')
        .replace(/el\.setAttribute\("class"/g, 'el.setAttribute("part"');
      fs.writeFileSync(outFile, result, 'utf8');
    }
  });
}

glob(config.files, (er, files) => files.forEach((element) => compile(element)));
