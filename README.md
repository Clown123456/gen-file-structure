# gen-file-structure
generate your file structure
# Getting Started                        
1. add your project
```bash
pnpm install gen-file-structure
```
2. then add `gen.config.js` in your project
```js
const path=require('path')
module.exports ={
    rootPath: path.resolve(__dirname,'../'),
    out: "./example.md",
}
```
3. excute `npx gen-file`
```bash
npx gen-file
```
or
```js
const gen=require('gen-file-structure')
gen({
  rootPath: path.resolve(__dirname,'../'),
  out: "./example.md",  
})
```


                     