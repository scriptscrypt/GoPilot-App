// const { getDefaultConfig } = require('expo/metro-config');
// const nodeLibs = require('node-libs-react-native');

// const config = getDefaultConfig(__dirname);
// config.resolver.extraNodeModules = {
//   ...nodeLibs,
//   crypto: require.resolve('react-native-quick-crypto'),
//   buffer: require.resolve('@craftzdog/react-native-buffer'),
// };

// module.exports = config;

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    unstable_allowRequireContext: true,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);