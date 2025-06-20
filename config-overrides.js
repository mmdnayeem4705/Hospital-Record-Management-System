const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    util: require.resolve("util/"),
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    assert: require.resolve("assert/"),
    buffer: require.resolve("buffer/"),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ]);

  return config;
};
