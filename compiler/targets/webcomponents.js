const compiler = require('../base.compiler');
const fs = require('fs');
const prependFile = require('prepend-file');

const DEFAULT_OPTIONS = {
  target: 'webcomponent',
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

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
