
const mongo = require('mongodb').MongoClient
const config = require("../../config")
const moment = require("moment")

const { isFunction } = require("lodash")

let client

module.exports = opts => new Promise((resolve, reject) => {
	mongo.connect(config.state.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
    })
    	.then( c => {
	    	client = c
	    	let db = client.db(config.state.db)
	        let collection = db.collection(config.state.collection)
	        
	        let setter = {}
	        setter[`${opts.dataset}.updatedAt`] = moment(new Date()).format("YYYY-MM-DD") 
	        setter = {$set:setter}

	        collection.updateOne({},setter)
	        	.then( () => {
	        		client.close()
    	    		resolve(opts)
	    		})
	    		.catch( e => {
	    			client.close()
    	    		reject(e.toString())	
	    		})
		})
		.catch( e => {
			if(client) client.close()
    		reject(e.toString())	
		})
})		
	    
            



