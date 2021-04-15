
const { isFunction } = require("lodash")

const SlaveProcessWrapper = class {
	constructor (callback) {
		this.callback = callback
		this.send = this.emit = message => { process.send(message) }
		process.on("message", command => {
			(isFunction(this.callback)) ? this.callback(command, this) : this.callback.callback(command, this)
		}) 
	}
}


module.exports = callback => new SlaveProcessWrapper(callback)


