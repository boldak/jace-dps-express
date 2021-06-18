const { createReadStream } = require('fs');
const CsvReadableStream = require('csv-reader');
const AutoDetectDecoderStream = require('autodetect-decoder-stream');
const { resolve } = require("path")
const { zipObject, extend } = require("lodash")
const fse = require("fs-extra")
const unzip = require("./unzip1")
const path = require("path")	   

let changeExtension = (file, extension) => {
  const basename = path.basename(file, path.extname(file))
  return path.join(path.dirname(file), basename + extension)
} 

module.exports = config => new Promise( (resolve,reject) => {
	
	if(path.extname(config.filePath) == ".csv"){
		resolve(config)
		return	
	}
	
	let options ={
		zipPath: config.filePath, 
		destDir: config.dir,
		zipEntry: config.zipEntry
	}

	
	unzip(options)
		.then( filePath => {
			config.filepath = filePath
			resolve(config)
		})
		.catch(e => {
			reject(e)
		})
	
})

