// import {generate } from 'core'
// import path from 'path'
const {generate}=require('core')
const path=require('path')

generate({
  rootPath:"../",
  out:path.resolve(__dirname,'../../总目录.md'),
  LinkSymbol:{
    file:"**",
    folder:"^^"
  },
  // append:true
  // excludes:['node_modules']
})