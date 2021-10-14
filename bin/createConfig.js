const fs = require('fs');

const config = require(process.cwd() + '/.localhostify.js');
const externalRedirects = Object.values(config).reduce((all, v) => [...all, ...v.externalRedirects], []);
const chromeConfig = '__LOCALHOSTIFY__ = ' + JSON.stringify({ externalRedirects }, 0, 3);

const extDir = process.cwd() + '/localhostify-ext';

if (!fs.existsSync(extDir)) {
   fs.mkdirSync(extDir);
}
if (!fs.existsSync(extDir + '/scripts')) {
   fs.mkdirSync(extDir + '/scripts');
}
if (!fs.existsSync(extDir + '/assets')) {
   fs.mkdirSync(extDir + '/assets');
}

fs.writeFileSync(process.cwd() + '/localhostify-ext/config.js', chromeConfig);
fs.copyFileSync(__dirname + '/../chrome-ext/manifest.json', process.cwd() + '/localhostify-ext/manifest.json');
fs.copyFileSync(__dirname + '/../chrome-ext/scripts/http.js', process.cwd() + '/localhostify-ext/scripts/http.js');
fs.copyFileSync(__dirname + '/../chrome-ext/scripts/fetch.js', process.cwd() + '/localhostify-ext/scripts/fetch.js');
fs.copyFileSync(__dirname + '/../chrome-ext/assets/green.png', process.cwd() + '/localhostify-ext/assets/green.png');
fs.copyFileSync(__dirname + '/../chrome-ext/assets/red.png', process.cwd() + '/localhostify-ext/assets/red.png');

console.log("Localhostify: Chrome Ext created in localhostify-ext folder.");
