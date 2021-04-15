
const mongo = require('mongodb').MongoClient

const { extend } = require("lodash")

// {
// 				url: "mongodb+srv://jace:jace@cluster0.53bkx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
// 				name: "covid_nszu",
// 				dateColumn:"date",
// 				collection: "covid_owid",
// 				sourceUrl:"https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv"
// }	


let client

module.exports = config => new Promise((resolve, reject) => {
	mongo.connect(config.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
    })
    	.then( c => {
	    	client = c
	    	let db = client.db(config.name)
	        let collection = db.collection(config.collection)
	        collection.aggregate([
			  {
			    '$group': {
			      '_id': `$${config.dateColumn}`
			    }
			  }, {
			    '$sort': {
			      '_id': -1
			    }
			  }, {
			    '$limit': 1
			  }
			]).toArray()
	        	.then( res => {
	        		client.close()
    	    		resolve( 
    	    			extend( config,{
    	    				lastDate: res[0]._id
    	    			})
    	    		)	
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
	    
            



