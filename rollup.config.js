import babel from 'rollup-plugin-babel';

export default {
  input: 'index.js',
  external: ['react', 'prop-types', 'tornis'],
  output: {
    format: 'umd',
    name: 'react-use-tornis',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
      tornis: 'tornis',
    },
    exports: 'named',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
