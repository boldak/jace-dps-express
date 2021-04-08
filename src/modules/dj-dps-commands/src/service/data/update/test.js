
const stages = require("./lib/stages")

stages.checkStatus("covid_owid")
    .then( config => {
        console.log(config)
        return stages.download(config)
    })
    .then( config => {
        console.log("download ",config)
        return stages.prepare(config)
    })
    .then(config => {
        console.log(config)
        return stages.processCsv(config)
    })
    .then( config => {
        // console.log(config)
        console.log(config.insertedRows.length)
        return stages.insertRows(config)
    })
    .then( config => {
      console.log(config)
      return stages.updateStatus(config)
    })
    .then( config => {
      console.log(config)
    })
    
