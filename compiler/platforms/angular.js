import fs from 'fs';
import htmlTags from 'html-tags';
import compiler from '../base.compiler.js';

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
    const result = data
      // Add selector to be a directive because in angular you cannot use existing tags
      .replace(
        /selector: ?["|'](.+), (.*)["|']/,
        `selector: "${
          !htmlTags.includes(file.name.replace('.lite', '')) ? '$1,' : ''
        }[pa-$1], $2", exportAs: "pa-$1", encapsulation: 2`
      )
      // Enable as default
      .replace(/export class/, 'export default class')
      // Replace classname for class
      .replace(/\.className/g, '.class')
      .replace(/className(\:|\")/g, 'class$1')
      // Enable children
      .replace(/(,\n)?(\} from \"\@angular\/core\"\;)/, ', ContentChildren, QueryList $2')
      .replace(
        /\@Input\(\) className\: any\;/,
        "@Input() className: any;\n@ContentChildren('child') children: QueryList<any>;"
      )
      // Fix value names on selectors
      .replace(/='value\((.*, ?)'(.*)'\)'/g, '="value($1\'$2\')"')
      // Fix angular styles property
      .replace(/\[style\]/g, '[ngStyle]')
      // Remove keys in loops
      .replace(/\[key\]=".*"/g, '')
      // Add  Optional chaining to nativeElement
      .replace(/\.nativeElement/g, '?.nativeElement')
      // TODO: Temporal meanwhile we find another why but this is stable
      .replace(/getData\(\);/g, 'getData.bind(this)();');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
