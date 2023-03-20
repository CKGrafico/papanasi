import fs from 'fs-extra';
import glob from 'glob';
import compiler from '../base.compiler.js';

const DEFAULT_OPTIONS = {
  target: 'vue',
  extension: 'vue',
  api: 'composition',
  state: '',
  styles: ''
};

(async () => {
  function getAllTheInterfacesFromPropsInComponent(result) {
    const regex1 = /interface\s+([^{]+){([^}]+)}/g;
    const interfacesWithProps = {};
    let match;

    while ((match = regex1.exec(result)) !== null) {
      const [interfaceDef] = match;
      const interfaceName = interfaceDef
        .split('{')[0]
        .replace(/\n\s*/g, '')
        .replace(/\{/g, '')
        .replace(/interface/g, '')
        .replace(/(extends)/g, ' $1')
        .trim();

      if (interfaceName.includes('Props')) {
        interfacesWithProps[interfaceName] = match[0]
          .replace(/interface/g, '')
          .replace(/(extends)/g, ' $1')
          .replace(/\{/g, '')
          .replace(/\}/g, '')
          .replace(interfaceName, '')
          .trim();
      }
    }

    return interfacesWithProps;
  }

  function searchComponentPropsInterface(result, interfacesWithProps, pascalName) {
    const [currentInterfacePropsName, currentInterfacePropsContent] = Object.entries(interfacesWithProps).find(
      ([interfaceName]) => interfaceName.includes(pascalName)
    );
    const extensions = currentInterfacePropsName
      .replace(/.*extends/, '')
      .trim()
      .split(',')
      .map((e) => e.trim());

    const interfacesContent = ['// Original props \n', currentInterfacePropsContent];

    extensions.forEach((extension) => {
      interfacesContent.push(`// Props from ${extension}\n`);
      interfacesContent.push(interfacesWithProps[extension]);
    });

    // TODO: GENERICS!!

    return interfacesContent;
  }

  function addNewPropsInterfacesForComponent(result, interfacesContent, pascalName) {
    // Create the new props interface
    const newPropsInterface = ` ${pascalName}Props {${interfacesContent.join('\n')}}`;

    // Deprecate the old props interface
    return (
      result
        // Deprecate the old props interface
        .replace(`export interface ${pascalName}Props`, `export interface __${pascalName}Props__`)
        // Add the new props interface
        .replace(
          `export interface __${pascalName}Props__`,
          `// This interface is auto generated to join the interfaces \nexport interface ${newPropsInterface}\n\nexport interface __${pascalName}Props__`
        )
    );
  }

  function mergeAllPropsInterfaceIntoNewInterface(result, pascalName) {
    const interfacesWithProps = getAllTheInterfacesFromPropsInComponent(result);
    const interfacesContent = searchComponentPropsInterface(result, interfacesWithProps, pascalName);
    return addNewPropsInterfacesForComponent(result, interfacesContent, pascalName);
  }

  function customReplace(props) {
    const { name, pascalName, outFile, outPath, isFirstCompilation } = props;

    if (isFirstCompilation) {
      const data = fs.readFileSync(`${outPath}/src/index.ts`, 'utf8');
      const result = data
        // Add .vue to index
        .replace(/(export)(.*)\/(.+)';/g, "$1$2/$3/$3.vue';")
        .replace(/(extensions)\/(.*)\.vue/g, '$1/$2')
        .replace(/\/helpers\.vue/g, '');

      fs.writeFileSync(`${outPath}/src/index.ts`, result, 'utf8');
    }

    const data = fs.readFileSync(outFile, 'utf8');

    const allTheNeededTypes = glob
      .sync([`src/models/**/*.model.ts`, `src/**/${name}.model.ts`])
      .reverse()
      .map((src) => fs.readFileSync(src, 'utf8'))
      .join('\n')
      // Remove type imports, should be injected
      .replace(/import type .*/g, '');

    let result = data
      // Inject needed types to this file as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
      .replace(/(<script setup)/g, `<script lang="ts">${allTheNeededTypes}</script>\n$1`)
      // Type defineProps and Inject types as cannot be imported in vue https://vuejs.org/guide/typescript/composition-api.html
      .replace(/(const props = defineProps)\(\[(.|\n)*\]\);/gm, `$1<${pascalName}Props>();`)
      // Enable children
      .replace(/this\.children/, 'this.$slots.default()')
      // Add vue dependencies
      // .replace('import', "import { ref } from 'vue';\nimport")
      // Replace vue html .values for refs
      .replace(/\.value \}\}/g, '}}')
      // Enable Typescript
      .replace(/script setup/g, 'script setup lang="ts"')
      // TODO: Temporal meanwhile we find another why but this is stable
      .replace(/getData\(\);/g, 'getData.bind(this)();');

    result = mergeAllPropsInterfaceIntoNewInterface(result, pascalName);

    if (name === 'column') {
      console.log(name);
    }
    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
