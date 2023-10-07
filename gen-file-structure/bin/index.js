#!/usr/bin/env node

const { generate } = require("../lib/index.js");

const params = process.argv[2];
const configPath = process.argv[3];
const { green, red, blue } = require("chalk");
switch (params) {
  case "-h":
  case "--help":
    console.log(
      `   
Commands:
  gen-file [file]     build for production
Options:
  -C, --config <file>     [string] your config file path
     `
    );
    break;
  case undefined:
    require("fs-extra")
      .pathExists(`${process.cwd()}\/gen.config.js`)
      .then((exists) => {
        if (exists) {
          generate(require(`${process.cwd()}\/gen.config.js`));
        } else {
          console.log(
            blue(`${process.cwd()}\/gen.config.js`),
            red(`is not exists`)
          );
        }
      });
    break;
  case "--config":
  case "-C":
    if (configPath) {
      const parserPath = require("../lib/cli/index.js").returnPath(configPath);
      require("fs-extra")
        .pathExists(parserPath)
        .then((exists) => {
          if (exists) {
            generate(require(`${parserPath}`));
          } else {
            console.log(blue(`parserPath`), red(`is not exists`));
          }
        });
    } else {
      console.log(red("no set configPath"));
    }

    break;
  default:
    console.log("Unknown command", red(`${params}`));
    break;
}
