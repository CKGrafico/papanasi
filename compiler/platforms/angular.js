import fs from 'fs';
import htmlTags from 'html-tags';
import compiler from '../base.compiler.js';
import { replaceClassName } from '../transforms/replacements.js';
import { applyConditionalReplacements } from '../transforms/text.js';

const DEFAULT_OPTIONS = {
  target: 'angular',
  extension: 'ts',
  state: '',
  styles: ''
};

(async () => {
  function customReplace(props) {
    const { file, outFile } = props;

    const data = fs.readFileSync(outFile, 'utf8');
    const normalizedClassNames = replaceClassName(data);
    const result = applyConditionalReplacements(normalizedClassNames, [
      {
        // Add selector to be a directive because in angular you cannot use existing tags
        pattern:
          /selector: ?["|'](.+), (.*)["|']/,
        replacement: `selector: "${
          !htmlTags.includes(file.name.replace('.lite', '')) ? '$1,' : ''
        }[pa-$1], $2", exportAs: "pa-$1", encapsulation: 2`
      },
      {
        // Enable as default
        pattern: /export class/,
        replacement: 'export default class'
      },
      {
        // Enable children
        pattern: /(,\n)?(\} from \"\@angular\/core\"\;)/,
        replacement: ', ContentChildren, QueryList $2'
      },
      {
        pattern: /\@Input\(\) className\: any\;/,
        replacement: "@Input() className: any;\n@ContentChildren('child') children: QueryList<any>;"
      },
      {
        // Fix value names on selectors
        pattern: /='value\((.*, ?)'(.*)'\)'/g,
        replacement: '="value($1\'$2\')"'
      },
      {
        // Fix angular styles property
        pattern: /\[style\]/g,
        replacement: '[ngStyle]'
      },
      {
        // Remove keys in loops
        pattern: /\[key\]=".*"/g,
        replacement: ''
      },
      {
        // Add Optional chaining to nativeElement
        pattern: /\.nativeElement/g,
        replacement: '?.nativeElement'
      }
    ]);

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
