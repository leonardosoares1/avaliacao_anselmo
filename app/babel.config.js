module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@errors': './src/errors',
          '@models': './src/models',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@services': './src/services',
          '@styles': './src/styles',
        },
      },
    ],
  ],
};
