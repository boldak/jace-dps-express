let dns = require("dns")
let url = require("url")
let Promise = require("bluebird")
let axios = require('axios');

let resolveUrl = (uri) => new Promise((resolve, reject) => {
	dns.resolve(url.parse(uri,true).host, (error, addresses) => { 
		if (error) {
			reject(error)
		} else {
			resolve(addresses[0])
		}
	})	
})


let aboutIp = (ip) => axios({
    url: "http://ip-api.com/json/"+ip,
    method: "GET"
}).then(resp => {
	let res = JSON.parse(resp.data)
	res.ipAddress = ip
	return res
})


module.exports = {
	resolveUrl,
	aboutIp
}

