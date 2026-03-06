import fs from 'fs';
import compiler from '../base.compiler.js';
import { replaceClassNameMemberAccess } from '../transforms/replacements.js';
import { applyConditionalReplacements } from '../transforms/text.js';

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
    const withClassNameFixed = replaceClassNameMemberAccess(data);
    const result = applyConditionalReplacements(withClassNameFixed, [
      {
        // fix keys
        pattern: / key\=/g,
        replacement: ' data-key='
      }
    ]);

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
