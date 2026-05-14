const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add web platform support
config.resolver.platforms = ['web', 'native', 'ios', 'android'];

// Ensure proper web bundling
config.transformer.unstable_allowRequireContext = true;

module.exports = config;