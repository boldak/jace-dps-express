const path = require("path")
var StreamZip = require('node-stream-zip');

module.exports = options => new Promise( (resolve, reject) => {

	const zip = new StreamZip.async({ file: options.zipPath });
	outputPath = path.resolve(options.destDir,"data.csv")
	zip.extract(options.zipEntry, outputPath)
		.then(() => zip.close())
		.then(() => {
			resolve(outputPath)
		})
		.catch( err => {
			reject(err)
		})
})		
