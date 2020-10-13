#!/usr/bin/env sh

scripts/commit-sha.js
npm run build:sw
npx ng build --prod --progress