
const mongo = require('mongodb').MongoClient
const config = require("../../config")
const { extend } = require("lodash")

let client

module.exports = dbName => new Promise((resolve, reject) => {
	mongo.connect(config.state.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
    })
    	.then( c => {
	    	client = c
	    	let db = client.db(config.state.db)
	        let collection = db.collection(config.state.collection)
	        collection.find({}).toArray()
	        	.then( res => {
	        		client.close()

    	    		resolve( extend(res[0][dbName], {dataset:dbName}) )
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
	    
            



