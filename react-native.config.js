module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'],
  dependencies: {
    'react-native-flipper': { platforms: { ios: null } },
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts(){
    return ['ts', 'tsx'];
  }
};
