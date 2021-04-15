const { fork } = require("child_process")
const { v4 } = require("uuid")
const { extend } = require("lodash")


module.exports = async function (childPath) {
	
	let forkedProcess = await fork(childPath)
	

	forkedProcess.execute = command => new Promise ((resolve, reject) => {
		
		let _request_id = v4() 
		
		let cb;
		
		cb = response => {
			if(response._request_id == _request_id) {
				resolve(response)
				forkedProcess.removeListener("message", cb)
			}	
		}
		
		forkedProcess.on("message", cb)
		setTimeout( () => { forkedProcess.send( extend( {_request_id}, command) )},0)
	})	
	
	return forkedProcess
}
