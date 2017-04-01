module.exports = {
  plugins: {
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
};
