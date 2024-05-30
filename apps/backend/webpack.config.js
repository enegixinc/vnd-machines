const { NxWebpackPlugin } = require('@nx/webpack');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/backend'),
  },
  entry: {
    main: './src/main.ts',
    seeder: './src/seeder.ts',
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: process.env.NODE_ENV === 'development' ? 0 : 1,
      generatePackageJson: true,
      outputHashing: 'none',
    }),
  ],
};
