#!/usr/bin/env node
const { generate } = require("../lib/index.js");
const { parserStr, operateFn } = require("../lib/cli/index.js");
const params = process.argv.slice(2);
console.log(params);
if (params.lengh == 0) {
  generate();
  return;
}
const configList = params.reduce((p, n) => {
  let com = parserStr(n);
  com && p.push(com);
  return p;
}, []);

const genConfig = operateFn(configList);
generate(genConfig);
