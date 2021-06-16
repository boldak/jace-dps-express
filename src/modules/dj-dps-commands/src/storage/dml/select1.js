
// let Promise = require("bluebird");
let jp = require("jsonpath");
let util = require("util");
let storageUtils = require("../utils");
let setCommand = require("../../var/set")
const mongo = require('mongodb').MongoClient
let config = require("./dml-config").mongodb



class DMLSelectImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "dml.select error";
  }
}


module.exports =  {
    name: "dml.select",
    synonims: {
        "dml.select": "dml.select",
        "dml.get": "dml.select"
    },

    "internal aliases":{
        "collection": "collection",
        "type": "collection",
        "entity":"collection",
        "from": "collection",

        "path": "path",
        "where": "path",
        "filter": "path",

        "as": "map",
        "map":"map",
        "return":"map",

        "ref":"ref",
        "populate": "populate",

        "into": "into"

    },
    
    defaultProperty: {
        "dml.select": "collection",
        "dml.get": "collection",
    },

    execute: function(command, state) {
        
        command.settings.path = command.settings.path || "$.*"
        command.settings.map = command.settings.map || ((item) => item)

        if(!util.isFunction(command.settings.map)){
            let attr_names = (util.isArray( command.settings.map)) ? command.settings.map : [ command.settings.map ]
            command.settings.map = item => {
                let res = {}
                if(attr_names.length>1){
                    attr_names.forEach( d => {
                        res[d] = item[d]
                    })    
                } else {
                    res = item[attr_names[0]]
                }
                
                return res
            }                    
        }

        if(!command.settings.collection) throw new DMLSelectImplError("No collection specified")    
        
        let parts = command.settings.collection.split(".")
        let database = "dj-storage"
        
        if (parts[1]){
            command.settings.collection = parts[1]
            database = parts[0]
        }  

        // let url = command.settings.on || connectionUrl
        // let parsed = require("url").parse(url).pathname
        // let pathNames = (parsed) ? parsed.split("/") : []
        // if(pathNames.length > 0) database = pathNames[pathNames.length-1]
        

        console.log("connect to ", config.url)

        let client
        return new Promise((resolve, reject) => {
            
                mongo.connect(config.url, config.options)
                .then( c => {
                    client = c
                    let db = client.db(database)
                    return db.collection(command.settings.collection)
                })
                .then( collection => {

                    collection.find({}).toArray()
                        .then(res => {
                            try {
                                let data = (util.isFunction(command.settings.path))
                                    ? res.filter(command.settings.path).map(command.settings.map)
                                    : jp.query(res, command.settings.path).map(command.settings.map)
                                state.head = {
                                    type: "json",
                                    data: data || []
                                }
                                if(command.settings.into){
                                    resolve(setCommand.execute({settings:{var:command.settings.into}}, state))
                                    client.close()
                                } else {
                                    resolve(state)
                                    client.close()    
                                }
                            } catch (e) {
                                reject(new DMLSelectImplError(e.toString()))
                                if(client) client.close()    
                            }        
                        })    
                        .catch( e => {
                            reject(new DMLSelectImplError(e.toString()))
                            if(client) client.close()    
                        })
                })    
                .catch(err => {
                    reject(new DMLSelectImplError(err.toString()))
                    if(client) client.close()
                })
                // .finaly(() => {
                //     client.close()
                // })
        })    

    },    



    //     return new Promise(function(resolve, reject) {
            
            
    //         command.settings.path = command.settings.path || "$.*"
    //         command.settings.map = command.settings.map || ((item) => item)

    //         if(!util.isFunction(command.settings.map)){
    //             let attr_names = (util.isArray( command.settings.map)) ? command.settings.map : [ command.settings.map ]
    //             command.settings.map = item => {
    //                 let res = {}
    //                 if(attr_names.length>1){
    //                     attr_names.forEach( d => {
    //                         res[d] = item[d]
    //                     })    
    //                 } else {
    //                     res = item[attr_names[0]]
    //                 }
                    
    //                 return res
    //             }                    
    //         }


            
    //         command.settings.populate = (command.settings.populate)
    //                                         ? (command.settings.populate == "*")
    //                                             ? getModelAssociations(sails.models[command.settings.collection])
    //                                             : command.settings.populate.split(",").map(item => item.trim())
    //                                         : [];    


            
    //         impl(command.settings, state)
    //             .then(function(result) {
    //                 state.head = {
    //                     type: "json",
    //                     data: result || []
    //                 }
    //                 if(command.settings.into){
    //                     resolve(setCommand.execute({settings:{var:command.settings.into}}, state))
    //                 }
    //                 resolve(state);
    //             })
    //             .catch(function(e) {
    //                 reject(e)
    //             })
    //     })
    // },

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