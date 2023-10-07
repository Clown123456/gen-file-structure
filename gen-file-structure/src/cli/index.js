const path = require("path");
const returnPath = (p) => {
  if (p.startsWith(".")) {
    return path.resolve(process.cwd(), p);
  } else if (p.startsWith("/")) {
    return p;
  } else {
    return path.resolve(process.cwd(), `./${p}`);
  }
};
exports.returnPath = returnPath;
