import adapter from '@sveltejs/adapter-auto';

const config = {
  kit: {
    adapter: adapter()
  },
  package: {
    source: 'src',
    dir: 'dist'
  }
};

export default config;
