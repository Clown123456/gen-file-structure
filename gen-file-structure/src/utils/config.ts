export  interface IConfig{
  rootPath:string // 根路径
  out:string 
  LinkSymbol:{
    folder:string  // 文件连接符
    file:string // 文件连接符
  }
  excludes:string[] // 排除的目录
  append:boolean //是否追加md
  }

  export type  IGenConfig=Partial<IConfig> & Required<{ rootPath: IConfig['rootPath'] ,out:IConfig['out']}>;
