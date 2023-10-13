import { getRealPath } from "../utils";
const path = require("path");
interface IPathConfig {
  sign: string;
  command: string;
}

const pathMapObj: {
  [key: string]: string;
} = {
  "-o": "out",
  "-r": "rootPath",
};
const returnPath = (p: string) => {
  if (p.startsWith(".")) {
    return path.resolve(process.cwd(), p);
  } else if (p.startsWith("/")) {
    return p;
  } else {
    return path.resolve(process.cwd(), `./${p}`);
  }
};
const parserStr = (str: string) => {
  if (str.split("=").length == 2) {
    return {
      sign: str.split("=")[0],
      command: getRealPath(str.split("=")[1]),
    };
  }
};
const operateFn = (list: IPathConfig[]) => {
  let config: {
    [key: string]: string;
  } = {};
  list.forEach((l) => {
    config[pathMapObj[l["sign"]]] = l["command"];
  });
  return config;
};
module.exports = {
  returnPath,
  parserStr,
  operateFn,
};
