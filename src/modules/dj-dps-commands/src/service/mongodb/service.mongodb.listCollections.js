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
    name: "service.mongodb.collections",

    synonims: {
        "service.mongodb.listCollections": "service.mongodb.collections",
        "service.mongodb.collections": "service.mongodb.collections"
    },

    "internal aliases": {
        "db": "db",
        "from": "db",
        "on": "on",
        "at": "on"

    },

    defaultProperty: {
        "service.mongodb.listCollections" : "db",
        "service.mongodb.collections": "db"
    },

    execute: function(command, state, config) {
        
        return new Promise((resolve, reject) => {
                let url = command.settings.on || connectionUrl 
                
                let db = command.settings.db || "dj-storage"               
                // let parsed = require("url").parse(url).pathname
                // let pathNames = (parsed) ? parsed.split("/") : []
                // if(pathNames.length > 0) db = pathNames[pathNames.length-1]
                
                let client
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                 })
                .then( c => {
                    let client = c
                    return client.db(db).listCollections().toArray()
                })
                .then ( res => {
                    console.log(url,db)
                        state.head = {
                            query:{
                                url,
                                db
                            },
                            type: "json",
                            data: res
                        }
                        resolve(state)
                        client.close()
                        .catch( e => {
                            reject(new MongoDBImplError(`On : ${url} \n ${e.toString()}`))    
                        })  
                })
                    
                .catch(err => {
                    reject(new MongoDBImplError(`On : ${url} \n ${err.toString()}`))
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