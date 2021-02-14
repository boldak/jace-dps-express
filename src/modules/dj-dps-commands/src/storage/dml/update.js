
let Promise = require("bluebird");
let util = require("util");
let storageUtils = require("../utils");
let config = require("./dml-config").mongodb
const mongo = require('mongodb').MongoClient



class DMLUpdateImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "dml.update error";
    }
}



var impl = (params, state)  => {


    let parts = params.collection.split(".")
    let database = "dj-storage"
    
    if (parts[1]){
        params.collection = parts[1]
        database = parts[0]
    }  

    // let url = connectionUrl
    // let parsed = require("url").parse(url).pathname
    // let pathNames = (parsed) ? parsed.split("/") : []
    // if(pathNames.length > 0) database = pathNames[pathNames.length-1]
    
    let client
        
    return mongo.connect(config.url, config.options)
                .then( c => {
                    client = c
                    let db = client.db(database)
                    return db.collection(params.collection)
                })
                .then( collection => {
                    params.where = params.where || {}
                    if(util.isFunction(params.where)){
                        return collection
                            .find({}).toArray()
                            .then( founded => Promise.all(
                                    founded.filter(params.where).map(( item, index ) => collection.updateOne(
                                        { _id: item._id },
                                        { $set: params.as( item, index )}
                                    ))
                            ))
                            .then( res => {
                                client.close()
                                return res
                            })
                            .catch(e => {
                                client.close()
                                throw new DMLUpdateImplError(e.toString())
                            })
                    } else {
                        
                        return collection.updateMany(
                                params.where,
                                {$set:params.as()}
                            )
                            .then( res => {
                                client.close()
                                return res
                            })
                            .catch(e => {
                                client.close()
                                throw new DMLUpdateImplError(e.toString())
                            })
                    } 
                })       

}

module.exports =  {
    name: "dml.update",
    synonims: {
        "dml.update": "dml.update"
    },

    "internal aliases":{
        "collection": "collection",
        "object": "collection",
        "entity":"collection",
        "from": "collection",
        "for": "collection",
        "where":"where",
        "set":"as",
        "as":"as"
    },
    
    defaultProperty: {},

    execute: function(command, state) {
        return new Promise(function(resolve, reject) {
            if(!command.settings.collection){
                reject(new DMLUpdateImplError("Entity collection is undefined"))
                return
            }
            
            command.settings.where = command.settings.where || {}
            command.settings.as = command.settings.as || ((item,index) => item) 
            if(!util.isFunction(command.settings.as)) {
                let setter = command.settings.as
                command.settings.as = () => setter     
            }

            
            impl(command.settings, state)
                .then(function(result) {
                    state.head = {
                        type: "json",
                        data: result
                    }
                    resolve(state);
                })
                .catch(function(e) {
                    reject(new DMLUpdateImplError(e.toString()))
                })
        })
    },

    help: {
        synopsis: "Save context into cache",
        name: {
            "default": "cache",
            synonims: ["cache","save"]
        },
        "default param": "none",
        params: [],
        example: {
            description: "Save context into cache",
            code: "load(\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\n    as:'json'\n)\nselect('$.metadata')\nextend()\ntranslate()\ncache()\nselect(\"$.data_id\")\n"
        }

    }
} 