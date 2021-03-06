'use strict';

import pkg from './package';
import { webpackModule } from './webpack.config.base.babel';

const DIRS = pkg.config.dirs;

// using old syntax because of babel, it will output exports.module
module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-webpack',
      'karma-coverage',
      'karma-sourcemap-loader'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      `${DIRS.src}/**/*.spec.js`
    ],
    browsers: ['PhantomJS'], // Specify 'PhantomJS', 'Chrome', 'Firefox', 'IE'
    reporters: ['progress', 'coverage'],
    colors: true,
    preprocessors: {
      [`${DIRS.src}/**/*.spec.js`]: ['webpack', 'sourcemap']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
    },
    logLevel: config.LOG_INFO,
    singleRun: true,
    webpack: {
      module: webpackModule,
      devtool: 'inline-source-map'
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
