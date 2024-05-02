const { NxWebpackPlugin } = require('@nx/webpack');
const { join } = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: false }),
  ],
  output: {
    path: join(__dirname, '../../dist/apps/backend'),
  },
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
