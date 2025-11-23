const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add support for .mjs files (required by framer-motion/moti)
config.resolver.sourceExts.push("mjs");

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "tslib") {
    return context.resolveRequest(
      context,
      require.resolve("tslib/tslib.es6.js"),
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
