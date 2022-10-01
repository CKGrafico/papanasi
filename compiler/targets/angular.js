const compiler = require('../base.compiler');
const htmlTags = require('html-tags');
const fs = require('fs');

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
      // Enable children
      .replace(/(,\n)?(\} from \"\@angular\/core\"\;)/, ', ContentChildren, QueryList $2')
      .replace(
        /\@Input\(\) className\: any\;/,
        "@Input() className: any;\n@ContentChildren('child') children: QueryList<any>;"
      )
      // Fix value names on selectors
      .replace(/='value\((.*, ?)'(.*)'\)'/g, '="value($1\'$2\')"')
      // Fix angular styles property
      .replace(/\[style\]/g, '[ngStyle]');

    fs.writeFileSync(outFile, result, 'utf8');
  }

  await compiler.compile({ ...DEFAULT_OPTIONS, customReplace });
})();
