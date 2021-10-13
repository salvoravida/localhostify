#!/usr/bin/env node
const env = process.argv[2];

if (env === '--chrome-ext') {
   require('./createConfig.js');
} else {
   require('../dist/index.js');
}
