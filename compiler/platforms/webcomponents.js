import fs from 'fs';
import prependFile from 'prepend-file';
import compiler from '../base.compiler.js';
import { replaceClassNameMemberAccess } from '../transforms/replacements.js';
import { applyConditionalReplacements } from '../transforms/text.js';

const DEFAULT_OPTIONS = {
  target: 'webcomponents',
  extension: 'ts',
  state: '',
  styles: ''
};

(async () => {
  function customReplace(props) {
    const { outFile } = props;

    // Ignore types
    prependFile.sync(outFile, '//@ts-nocheck \n');

    // Make component exportable
    const data = fs.readFileSync(outFile, 'utf8');
    const withClassNameFixed = replaceClassNameMemberAccess(data).replace(
      /el\.className ?= ?\n?(.*);/g,
      'el.setAttribute("part",$1);'
    );
    const result = applyConditionalReplacements(withClassNameFixed, [
      {
        // Fix class name
        pattern: /class /,
        replacement: 'export default class '
      },
      {
        pattern: /customElements\.define\("(.*)",(.*)\);/g,
        replacement: 'customElements.get("pa-$1") || customElements.define("pa-$1", $2);'
      },
      {
        // Fix part selectors
        pattern: /class=/g,
        replacement: 'part='
      },
      {
        pattern: /el\.setAttribute\("class"/g,
        replacement: 'el.setAttribute("part"'
      },
      {
        // Enable children
        pattern: /this\.props\.children/,
        replacement: 'this.shadowRoot.querySelector("slot").assignedNodes().filter((x,i) => i % 2 !== 0 )'
      }
    ]);

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
