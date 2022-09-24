const compiler = require('./shared/shared.compiler')

const DEFAULT_OPTIONS = {
  target: 'vue',
  extension: 'vue'
};

function compile(options) {
  compiler.compile(options);
}

compile(DEFAULT_OPTIONS);
