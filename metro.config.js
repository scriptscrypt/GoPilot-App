const { getDefaultConfig } = require('expo/metro-config');
const nodeLibs = require('node-libs-react-native');
const path = require('path');

const config = getDefaultConfig(__dirname);
config.resolver.extraNodeModules = {
  ...nodeLibs,
  crypto: require.resolve('react-native-quick-crypto'),
  buffer: require.resolve('@craftzdog/react-native-buffer'),
  '@dynamic-labs/utils': path.resolve(__dirname, 'node_modules/@dynamic-labs/utils'),
  '@dynamic-labs/message-transport': path.resolve(__dirname, 'node_modules/@dynamic-labs/message-transport'),
};

module.exports = config;
