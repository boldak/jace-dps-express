const path = require("path")

module.exports = options => new Promise( (resolve, reject) => {
	const inly = require('inly');
	const extract = inly(options.path2zip, options.path2dest);
	let _p = 0
	
	extract.on('file', name => {
		if(onFile) {
			options.onFile(name)
		} else {
			console.log(`file ${name} extracted`);
		}	
	});

	extract.on('progress', percent => {
		if(onProgress) {
			options.onProgress(percent)
		} else {
			if( config.mode == "development"){
				if( (percent % 5) == 0) _p = percent
			}	
		}	
	});

	extract.on('error', error => {
	    reject(error)
	});

	extract.on('end', () => {
	    resolve()
	});	
})

