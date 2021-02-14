const path = require('path');
const fs  = require('fs');
let Promise = require("bluebird")



async function recurseDirectory(rootDir) {
  
   function install(relativeDir) {
    let command = `${/^win/.test(process.platform) ? 'npm.cmd' : 'npm'} install ${relativeDir}`
    console.log("EXECUTE ",command)
    let action = require('execa')(command)
    let stream = action.stdout;
    stream.pipe(process.stdout);
    return action
  }

  
  const commands = []

  let scan = folder => {
      try {
        // Check if package.json exists, if it doesnt this will error and move on
        pkg = JSON.parse(fs.readFileSync(path.join(folder, 'package.json')));
        commands.push(path.resolve(folder))
        
            
      } catch (e) {}

      fs.readdirSync(folder, { withFileTypes: true })
          .filter( f => f.isDirectory() && f.name !== 'node_modules')
          .forEach( f => { scan(path.join(folder, f.name))})
  }
  
  scan(rootDir)
  
  console.log(`Found ${commands.length} submodules`)
  console.log(commands)
  
  return   Promise.reduce( commands, (count, folder) => {
    return install(folder)
      .then(() => {
          count++; 
          return count
      })
     } 
    , 0)
}


async function startRecursiveInstall(directories) {
  const promise = Array.isArray(directories)
    ? Promise.all(directories.map(rootDir => recurseDirectory(rootDir)))
    : recurseDirectory(directories);
  await promise;
}


module.exports = startRecursiveInstall(process.cwd());
