#!/usr/bin/env node
var childProcess = require('child_process');
var path = require('path');
var process = require('process');
var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;

var childArgs = [
  path.join(__dirname, 'phantom-main.js'),
].concat(process.argv.slice(2));

try {
  childProcess.execFileSync(binPath, childArgs, { stdio: [0, 0, 0] });
} catch (e) { }
