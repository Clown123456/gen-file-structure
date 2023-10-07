// const fse = require('fs-extra')
// const path=require('path')
import {pathExistsSync,readdir,readdirSync,statSync, writeFileSync} from 'fs-extra'
import path from 'path'
import { isDir, repeatString } from '.'
import { IGenConfig } from './config'
const dirSign="└──"
const fileSign="├──"
let tem=""
function parser(option:Partial<IGenConfig>){
  const {rootPath,out}=option
  if(rootPath&&isDir(rootPath)){
    tem=""
    getStructure(rootPath,0)
    writeMarkdown(tem,out?out:"structure.md")
  }
}




/* 生成文件结构图*/
function getStructure(rootPath:string,level=0){
  const dirList= readdirSync(rootPath,"utf-8")
    dirList.map((dir)=>{
        const curPath=rootPath+'/'+dir
        if(isDir(curPath)){
            tem +=
`
${repeatString('   ',level)}${dirSign}${dir}
`
            if(readdirSync(curPath).length){
                  
                 getStructure( curPath,++level)
                 --level
                 
            }
        }else{
            tem +=
`
${repeatString('   ',level)}${fileSign}${dir}
`
        }  
    })
}


function writeMarkdown(tem:string,out:string){
  const rootPath = path.join(__dirname,)
  const tems=
  `
  #文件结构如图所示
  \`\`\`bash
  ${tem}
  \`\`\`
  `
  writeFileSync(out,tems)
  }


  parser({
    rootPath:path.resolve(__dirname,"../../"),
    // out:path.resolve(__dirname,"../../my.md")
  })




