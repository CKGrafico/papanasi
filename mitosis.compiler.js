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
          force: true,

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
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        // Add selector to be a directive because in angular you cannot use existing tags
        .replace(
          /selector: ?["|'](.+)["|']/,
          `selector: "${
            !htmlTags.includes(file.name.replace('.lite', '')) ? '$1,' : ''
          }[pa-$1]", exportAs: "pa-$1", encapsulation: 2`
        )
        // Enable children
        .replace(/(,\n)?(\} from \"\@angular\/core\"\;)/, ', ContentChildren, QueryList $2')
        .replace(
          /\@Input\(\) className\: any\;/,
          "@Input() className: any;\n@ContentChildren('child') children: QueryList<any>;"
        )
        // Fix value names on selectors
        .replace(/='value\((.*, ?)'(.*)'\)'/g, '="value($1\'$2\')"')
        // Fix angular styles property
        .replace(/\[style\]/g, '[styles]');

      fs.writeFileSync(outFile, result, 'utf8');
    }

    if (target === 'react') {
      // Add react import
      prependFile.sync(outFile, '//@ts-nocheck \n import React from "react"; \n');
    }

    if (target === 'solid') {
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        // temporary fix to dont use useRef
        .replace(/useRef\(\)/g, '(document.body as any) /* This is broken waiting for mitosis update */')
        .replace(/\, ?useRef/, '');
      fs.writeFileSync(outFile, result, 'utf8');
    }

    if (target === 'svelte' && isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        // Add .svelte to index
        .replace(/\'\;/g, ".svelte';")
        .replace(/\.css\.svelte/g, '.css')
        .replace(/helpers\.svelte/g, 'helpers');
      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    if (target === 'svelte') {
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        // Work with children (currently not working as expected)
        .replace(/children/g, '$$$slots');

      fs.writeFileSync(outFile, result, 'utf8');
    }

    if (target === 'vue' && isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        // Add .vue to index
        .replace(/\'\;/g, ".vue';")
        .replace(/\.css\.vue/g, '.css')
        .replace(/helpers\.vue/g, 'helpers');
      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    if (target === 'vue') {
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        // Enable children
        .replace(/this\.children/, 'this.$slots.default()');

      fs.writeFileSync(outFile, result, 'utf8');
    }

    if (target === 'webcomponent') {
      // Ignore types
      prependFile.sync(outFile, '//@ts-nocheck \n');

      // Make component exportable
      const data = fs.readFileSync(outFile, 'utf8');
      const result = data
        // Fix class name
        .replace(/class /, 'export default class ')
        .replace(
          /customElements\.define\("(.*)",(.*)\);/g,
          'customElements.get("pa-$1") || customElements.define("pa-$1", $2);'
        )
        // Fix part selectors
        .replace(/class=/g, 'part=')
        .replace(/el\.setAttribute\("class"/g, 'el.setAttribute("part"')
        .replace(/el\.className ?= ?\n?(.*);/g, 'el.setAttribute("part",$1);')
        // Enable children
        .replace(
          /this\.props\.children/,
          'this.shadowRoot.querySelector("slot").assignedNodes().filter((x,i) => i % 2 !== 0 )'
        );
      fs.writeFileSync(outFile, result, 'utf8');
    }
  });
}

glob(config.files, (er, files) => files.forEach((element) => compile(element)));
