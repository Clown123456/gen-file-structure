# gen-file-structure
generate your file structure
# Getting Started                        
1. add your project
```bash
pnpm install gen-file-structure
```
2. generate your file structure
```js
const gen=require('gen-file-structure')
gen({
  rootPath: path.resolve(__dirname,'../'),
  out: "./example.md",  
})
```
3. specify ignored files or folders  
By default, `node_ modules` and `.git` folders will be ignored.
```js
const gen=require('gen-file-structure')
gen({
  rootPath: path.resolve(__dirname,'../'),
  out: "./example.md", 
  excludes:['package.lock.json',"node_modules",'.git'] 
})
```
4. Whether to append it to the Markdown document
```js
const gen=require('gen-file-structure')
gen({
  rootPath: path.resolve(__dirname,'../'),
  out: "./example.md", 
  excludes:['package.lock.json',"node_modules",'.git'], 
  append: true
})
```
# command line
1. Generate file structure in the current directory, the default file name is `structure.md`
```bash
npx gen-file
```
2. Specify the generated root directory and output directory
```bash
npx gen-file -r=./src -o=./myFile.md
```
# examples
excute `npx gen-file -r=./node_modules/jest`
```bash
├──bin
│  ├──jest.js
├──build
│  ├──index.d.ts
│  └──index.js
├──LICENSE
├──README.md
└──package.json
```






                     