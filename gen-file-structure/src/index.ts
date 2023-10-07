import {
  readdirSync,
  writeFileSync,
  readFileSync,
  pathExistsSync,
  ensureDir,
  ensureDirSync,
  pathExists,
} from "fs-extra";
import path from "path";
import { isDir, repeatString, getRealPath, sortDir } from "./utils";
import { IGenConfig } from "./utils/config";
// import chalk from "chalk";
class Gen {
  private config: IGenConfig;
  private tem: string;
  private preTem: string;
  private dirSign: string;
  private fileSign: string;
  private excludes: string[];

  private realPath: string;
  private out: string;
  private append: boolean;
  constructor(config: IGenConfig) {
    this.config = config;
    this.tem = "";
    this.preTem = "";
    const { rootPath, LinkSymbol, excludes, out, append } = this.config;
    this.realPath = getRealPath(rootPath);
    this.dirSign = LinkSymbol?.folder ? LinkSymbol?.folder : "└──";
    this.fileSign = LinkSymbol?.file ? LinkSymbol?.file : "├──";
    this.excludes =
      excludes && excludes instanceof Array ? excludes : ["node_modules"];
    this.out = out;
    this.append = append != undefined ? append : false;
    console.log(require("chalk").green("reading configuration information..."));
  }

  /* 生成文件结构图*/
  getStructure(realPath: string, level = 0) {
    const dirList = sortDir(readdirSync(realPath, "utf-8"), this.realPath);
    const dirLen = dirList.length;
    dirList.map((dir, index) => {
      const flag = index > 0 && dirLen == index + 1;
      if (!this.excludes.includes(dir)) {
        const curPath = realPath + "/" + dir;
        this.tem += `
${repeatString("│  ", level)}${flag ? this.dirSign : this.fileSign}${dir}`;
        if (isDir(curPath) && readdirSync(curPath).length) {
          this.getStructure(curPath, ++level);
          --level;
        }
      }
    });
  }
  writeMarkdown(tem: string, out: string) {
    console.log(require("chalk").green("writing to file..."));

    let fileTem = ``;
    if (this.append) {
      const preContent = this.getPreContent();
      if (preContent) {
        fileTem += preContent;
      }
    }
    fileTem += `
\`\`\`bash
${tem}
\`\`\`
`;
    try {
      writeFileSync(out, fileTem);
    } catch (error) {
      console.log(error);
    }
  }
  getPreContent() {
    let fileContent = "";
    if (pathExistsSync(this.out) && this.config?.append) {
      fileContent = readFileSync(this.out, {
        encoding: "utf-8",
      });
    }
    return fileContent;
  }

  genContent() {
    console.log(require("chalk").green("generating file..."));
    this.getStructure(this.realPath);
  }
  write() {
    this.writeMarkdown(this.tem, this.out);
    console.log(
      "success, entered directory：",
      require("chalk").green(this.out)
    );
  }
}
function generate(config: IGenConfig) {
  const chalk = require("chalk");
  if (!config.rootPath) {
    console.log(chalk.red("rootPath is required!"));
    return;
  }
  if (!isDir(config.rootPath)) {
    console.log(chalk.red("this path is not a directory!"));
    return;
  }

  if (!config.out) {
    console.log(chalk.red("out is required!"));
    return;
  }

  if (pathExistsSync(config.out)) {
    console.log(chalk.red("路径不存在"));
    return;
  }

  const gen = new Gen(config);
  gen.genContent();
  gen.write();
}
export { generate };
