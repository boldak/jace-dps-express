const { createReadStream } = require('fs');
const CsvReadableStream = require('csv-reader');
const AutoDetectDecoderStream = require('autodetect-decoder-stream');
const { resolve } = require("path")
const { zipObject, extend } = require("lodash")
const fse = require("fs-extra")	    

module.exports = config => new Promise( (resolve,reject) => {
	let inputStream = createReadStream(config.filePath)
	    .pipe(new AutoDetectDecoderStream({ defaultEncoding: 'UTF8' })); // If failed to guess encoding, default to 1255
	 
	// The AutoDetectDecoderStream will know if the stream is UTF8, windows-1255, windows-1252 etc.
	// It will pass a properly decoded data to the CsvReader.
	let count = 0 
	let fields
	let insertedRows = []

	inputStream
	    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
	    .on('data', function (row) {
	    	// if(row[config.dateColumn] > config.lastDate)
	        if( count == 0 ){
	        	fields = row
	        } else {
	        	if( count > 1){
	        		let data = zipObject(fields,row)
	        		if(data[config.dateColumn] > config.lastDate){
	        			insertedRows.push(data)
	        		}
	        	}
	        }
	        
	        count++	
	        
	    }).on('end', function (data) {
	    	fse.remove(config.dir)
	        resolve( extend(config, {insertedRows}))
	    });
})

