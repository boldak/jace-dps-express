let Promise = require("bluebird")
const mongo = require('mongodb').MongoClient //Promise.promisifyAll(require('mongodb').MongoClient)

let connectionUrl = process.env.MONGOLAB_URI || process.env.MONGODB_URL || process.env.ATLAS_URL || "mongodb://localhost:27017"

class MongoDBImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "mongodb service error";
    }
}


module.exports = {
    name: "service.mongodb.remove",

    synonims: {
        "service.mongodb.remove": "service.mongodb.remove",
        "service.mongodb.delete": "service.mongodb.remove"
    },

    "internal aliases": {
        "query": "query",
        "where": "query",
        // "selector": "query",
        // "filter": "query",
        // "sort": "sort",
        // "orderBy":"sort",
        // "aggregate": "aggregate",
        "db": "db",
        "from": "collection",
        "collection": "collection",
        "on": "on",
        "at": "on"
          
    },

    defaultProperty: {
        "service.mongodb.remove": "query",
        "service.mongodb.delete": "query"
    },

    execute: function(command, state, config) {
        
        let query = command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data) || {}
        if (!query) throw new MongoDBImplError(`No query available`)
        if(!command.settings.collection) throw new MongoDBImplError("No collection specified")    
        // let sort = command.settings.sort || {}
        // let aggregate = command.settings.aggregate || {$limit:20}

        let parts = command.settings.collection.split(".")
        let database = "dj-storage"
        
        if (parts[1]){
            command.settings.collection = parts[1]
            database = parts[0]
        }  

        let url = (command.settings.on) ? command.settings.on : connectionUrl
        // let parsed = require("url").parse(url).pathname
        // let pathNames = (parsed) ? parsed.split("/") : []
        // if(pathNames.length > 0) database = pathNames[pathNames.length-1]
        
        let doc = command.settings.document || {}


        let client
        return new Promise((resolve, reject) => {
            
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                 })
                .then( c => {
                    client = c
                    let db = client.db(database)
                    let collection = db.collection(command.settings.collection)
                    collection.deleteMany(query)//.toArray()
                        .then(res => {
                            // console.log(res)
                            state.head = {
                                type: "json",
                                data: res
                            }
                            resolve(state)
                            if(client) client.close()
                        .catch( e => {
                            reject(new MongoDBImplError(e.toString()))
                            if(client) client.close()    
                        })
                    })
                    .catch(err => {
                        reject(new MongoDBImplError(err.toString()))
                        if(client) client.close()
                    })
                })    

        })
    },


    help: {
        synopsis: "Tokenize document",

        name: {
            "default": "rank",
            synonims: []
        },
        input: ["table"],
        output: "table",
        "default param": "indexes",
        params: [{
            name: "direction",
            synopsis: "Direction of iteration (optional)",
            type: ["Rows", "row", "Columns", "col"],
            synonims: ["direction", "dir", "for"],
            "default value": "Columns"
        }, {
            name: "indexes",
            synopsis: "Array of 0-based indexes of items that will be ranked (optional)",
            type: ["array of numbers"],
            synonims: ["indexes", "items"],
            "default value": []
        }, {
            name: "asc",
            synopsis: "Define order (optional)",
            type: ["A-Z", "az", "direct", "Z-A", "za", "inverse"],
            synonims: ["order", "as"],
            "default value": "A-Z"
        }],
        example: {
            description: "Rank first column values",
            code: "load(\r\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\r\n    as:\"dataset\"\r\n)\r\nproj([\r\n  { dim:'time', role:'row', items:[] },\r\n  { dim:'indicator', role:'col', items:[] }\r\n])\r\n\r\nrank(for:\"col\",items:[0],as:\"az\")\r\n\r\norder(by:0, as:\"az\")\r\n\r\n"
        }
    }
}