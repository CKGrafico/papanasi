import { globalCompile } from './shared/shared.compiler.js';

const DEFAULT_OPTIONS = {
  target: 'vue',
  extension: 'vue'
};

export function compile(options) {
  globalCompile(options);
}

compile(DEFAULT_OPTIONS);
