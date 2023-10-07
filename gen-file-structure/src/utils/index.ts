import { pathExistsSync, statSync } from "fs-extra";
import path from "path";

export const isDir=(rootPath:string)=>{

  if(  pathExistsSync(rootPath) && statSync(rootPath).isDirectory()){
    return true
 
  }
  return false

}
export const repeatString=(str:string, n:number)=> {
  let result = '';
  for (let i = 0; i < n; i++) {
    result += str;
  }
  return result;
}

export const getRealPath = (p:string) => {
  if (p.startsWith(".")) {
    return path.resolve(process.cwd(), p);
  } else if (p.startsWith("/")) {
    return p;
  } else {
    return path.resolve(process.cwd(), `./${p}`);
  }
};

export const sortDir=(list:string[],realPath:string)=>{
  const dirList=list.filter(item=> isDir(realPath+'/'+item))
  const fileList=list.filter(item=> !isDir(realPath+'/'+item))
  return [...dirList,...fileList];
 
}

