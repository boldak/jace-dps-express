let Promise = require("bluebird")
const mongo = require('mongodb').MongoClient
const service_config = require("./config")



class MszuDataImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "MZSU DATA service error";
    }
}


module.exports = {
    name: "service.data.nszu.get",

    synonims: {
        "service.data.nszu.get": "service.data.nszu.get"
    },

    "internal aliases": {
        "query": "query"
    },

    defaultProperty: {
        "service.data.nszu.get": "query"
    },

    execute: function(command, state, config) {
        
        let query = command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data)
        if (!query) throw new MszuDataImplError(`No query available`)
        

        let client
        return new Promise((resolve, reject) => {
            
                mongo.connect(service_config.db.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                 })
                .then( c => {
                    client = c
                    let db = client.db(service_config.db.name)
                    let collection = db.collection(service_config.db.collection)
                    collection.aggregate(query).toArray()
                        .then(res => {
                        console.log(res)    
                        state.head = {
                            type: "json",
                            data: res
                        }
                        resolve(state)
                        client.close()
                        .catch( e => {
                            reject(new MszuDataImplError(e.toString()))    
                        })
                    })
                    .catch(err => {
                        reject(new MszuDataImplError(err.toString()))
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