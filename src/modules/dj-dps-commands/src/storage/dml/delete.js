
let Promise = require("bluebird");
let util = require("util")
// let storageUtils = require("../utils");
const mongo = require('mongodb').MongoClient
let config = require("./dml-config").mongodb

class DMLDeleteImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "dml.delete error";
    }
}



var impl = function(params, state){
	
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
                    params.criteria = params.criteria || {}

                    if(util.isFunction(params.criteria)){
                        return collection
                            .find({}).toArray()
                            .then( founded => Promise.all(
                                    founded.filter(params.criteria).map(item => collection.deleteOne({_id:item._id}))
                            ))
                            .then( res => {
                                client.close()
                                return res
                            })
                            .catch(e => {
                                client.close()
                                throw new DMLDeleteImplError(e.toString())
                            })

                    } else {
                        return collection
                            .deleteMany(params.criteria)
                            .then( res => {
                                client.close()
                                return res
                            })    
                    }        
                })
                .catch( e => {
                    client.close()
                    throw new DMLDeleteImplError(e.toString())
                })

   //  return new Promise(function(resolve,reject){
   //      storageUtils.access(state.client, params.collection, 'delete')
   //          .then(()=>{
   //              var collection = sails.models[params.collection]
   //              if(util.isFunction(params.criteria)){
   //                  collection
   //                      .find({})
   //                      .then((founded) => {
   //                          resolve( Promise.all(
   //                              founded.filter(params.criteria).map((item) => collection.destroy({id:item.id}))
   //                          ))
   //                      })
   //                      .catch((e) => {reject(new DMLDeleteImplError(e.toString()))})

   //              } else {
   //                  resolve(collection.destroy(params.criteria))    
   //              }        
   //          })
   //          .catch((e) => {reject(new DMLDeleteImplError(e.toString()))})
  	// })
}

module.exports =  {
    name: "dml.delete",
    synonims: {
        "dml.delete": "dml.delete"
    },

    "internal aliases":{
        "collection": "collection",
        "object": "collection",
        "entity":"collection",
        "from": "collection",
        "where":"where"
    },
    
    defaultProperty: {},

    execute: function(command, state) {
        return new Promise(function(resolve, reject) {
            if(!command.settings.collection){
                reject(new DMLDeleteImplError("Entity collection is undefined"))
                return
            }
            
            // if (!sails.models[command.settings.collection]) {
            //     reject(new DMLDeleteImplError("Entity collection '" + command.settings.collection + "' is not available"))
            //     return
            // }
            // if (typeof sails.models[command.settings.collection] != "object") {
            //     reject(new DMLDeleteImplError("Entity collection '" + command.settings.collection + "' is not available"))
            //     return
            // }
            
            command.settings.criteria = command.settings.where || {}

            impl(command.settings, state)
                .then(function(result) {
                    state.head = {
                        type: "json",
                        data: result
                    }
                    resolve(state);
                })
                .catch(function(e) {
                    reject(new DMLDeleteImplError(e.toString()))
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