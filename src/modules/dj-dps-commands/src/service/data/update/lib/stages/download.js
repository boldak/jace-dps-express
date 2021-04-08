
const path = require("path")
const axios = require('axios')
const url = require('url')
const { createWriteStream } = require('fs')
const fs = require('fs').promises
const os = require('os')
const { extend } = require("lodash")


module.exports = config => new Promise((resolve,reject) => {

	fs.mkdtemp(path.join(os.tmpdir(), 'JACETEMP-'))
		.then( dir => {

			let fileUrl = config.sourceUrl
			axios.get(fileUrl, {responseType: "stream"} )  
				.then(response => {

					let filePath = path.resolve( __dirname, dir, path.parse(url.parse(fileUrl).pathname).base)
					let outputStream = createWriteStream(filePath)
					response.data.pipe(outputStream);
					outputStream.on("close", () => {
						resolve( extend(config, {
							dir,
							filePath
						}))
					})
					
					outputStream.on("error", error => {
						reject(error)
					})
				})

		})
})				    
            



