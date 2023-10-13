export  interface IConfig{
  rootPath:string // root path
  out:string
  excludes:string[] // excludes directory
  append:boolean //append to md
  }

  export type  IGenConfig=Partial<IConfig>;
