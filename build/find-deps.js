const path = require('path');
const fs  = require('fs');
let Promise = require("bluebird")
let _ = require("lodash-node")

let extract_deps = source => {
  let res = source.match(/require\([\"\'\`]+.+[\"\'\`]+\)/gm) || []
  res = res.map( r => r.replace(/^require\([\"\'\`]/g,"").replace(/[\"\'\`]\)$/g,""))
  return res
}

let deps = []


  let scan = folder => {
      try {
        // Check if package.json exists, if it doesnt this will error and move on
        
        fs.readdirSync(folder, { withFileTypes: true })
          .filter( f => !f.isDirectory() && f.name.endsWith(".js"))
          .forEach( f => { 
              let content = fs.readFileSync(path.resolve(path.join(folder,f.name))).toString()
              deps = deps.concat(extract_deps(content))  
          })
      } catch (e) {}

      fs.readdirSync(folder, { withFileTypes: true })
          .filter( f => f.isDirectory() && f.name !== 'node_modules')
          .forEach( f => { scan(path.join(folder, f.name))})
  }
  
  scan(process.cwd())

  deps = _sortBy(_.unique(deps))

  console.log(`Found ${deps.length} dependencies`)
  console.log(deps)



// let res = `
// const path = require('path');
// const fs  = require('fs');
// let Promise = require("bluebird")



// // async function recurseDirectory(rootDir) {
  
   
// //   const deps = []

// //   let scan = folder => {
// //       try {
// //         // Check if package.json exists, if it doesnt this will error and move on
        
// //         fs.readdirSync(folder, { withFileTypes: true })
// //           .filter( f => !f.isDirectory() && f.name.endsWith(".js"))
// //           .forEach( f => { 
// //               let content = fs.readFileSync(path.resolve(path.join(folder,f.name))).toString()

// //           })

// `.match(/require\([\"\'\`]+.+[\"\'\`]+\)/gm) || []
// res = res.map( r => r.replace(/^require\([\"\'\`]/g,"").replace(/[\"\'\`]\)$/g,""))

// console.log(res)
