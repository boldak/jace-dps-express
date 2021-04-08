const { find, extend } = require("lodash")


class Controller {
	constructor(options = {commandIdProperty:"path"}){
		this.options = options
		this.callbacks = []	
	}

	callback(command, masterProcess) {
		let executor = 	find(this.callbacks, item => item[this.options.commandIdProperty] == command[this.options.commandIdProperty]) 
						|| 
						{
							callback: ()=>{masterProcess.send(extend(command, {response:null}))}
						}
		executor.callback(command, masterProcess)	
	}

	add( path, callback){
		this.callbacks.push({path, callback})
		return this
	}
}


module.exports = Controller


