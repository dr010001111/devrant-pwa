#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const pkgPath = path.resolve(__dirname, '../package.json');
const quickInfoPath = path.resolve(__dirname, '../src/appInfo');

const pkg = JSON.parse(fs.readFileSync(pkgPath).toString());

const sha = cp.execSync('git rev-parse --short HEAD')

pkg['commit']['sha'] = String(sha).trim();

const quickInfo = `v${pkg.version}#${pkg.commit.sha}`

fs.writeFileSync(quickInfoPath, quickInfo);
console.log('WRITE appInfo')

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4));
console.log('WRITE package.json')
