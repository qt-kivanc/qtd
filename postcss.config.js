module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-nesting'),
    require('postcss-calc'),
    require('postcss-normalize'),
    require('cssnano')({
      preset: 'default',
    }),
    require('postcss-preset-env')({
      stage: 3,
      autoprefixer: {
        grid: false,
      },
      features: {
        'nesting-rules': true,
      },
    }),
    require('postcss-custom-properties')({
      preserve: false,
      variables: {
        '--main-backgrounds': '#282c34',
      },
    }),
  ]
};