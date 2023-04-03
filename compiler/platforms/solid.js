import fs from 'fs';
import compiler from '../base.compiler.js';

const DEFAULT_OPTIONS = {
  target: 'solid',
  extension: 'tsx',
  state: 'useState',
  styles: 'styled-components'
};

(async () => {
  function customReplace(props) {
    const { outFile } = props;

    const data = fs.readFileSync(outFile, 'utf8');
    const result = data
      // fix keys
      .replace(/ key\=/g, ' data-key=')
      // Replace classname for class
      .replace(/\.className/g, '.class');
    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
