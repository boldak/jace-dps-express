let Promise = require("bluebird");
// let uuid = require('uuid');

class WaitError extends Error {
  constructor(message) {
    super(message);
    this.name = "wait error";
  }
}

module.exports = {
    name: "wait",
    synonims: {
        "wait": "wait"
    },

    "internal aliases":{
        "promise": "promise"
    },

    
    defaultProperty: {
        "wait": "promise"
    },

   

    execute: function(command, state) {
        return new Promise((resolve, reject) => {
            if (!command.settings.promise || !(command.settings.promise instanceof Promise)) 
                reject(new WaitError(` ${command.settings.promise} is not a instance of Promise`)) 
            command.settings.promise.then( res => {
                // state.head.data = res
                resolve(state)
            })
        })       
    },    
            
    
    help: {
        synopsis: "Create new entity collection",
        name: {
            "default": "ddl.create",
            synonims: ["ddl.entity"]
        },
        input: ["waterline model description"],
        output: "json",
        "default param": "model",
        params: [{
            name: "model",
            synopsis: "Collection name. Retuns all definitions when collection name is undefined",
            type: ["string"],
            synonims: ["model", "for"],
            "default value": "undefined"
        }],
        example: {
            description: "Get Definition for All Stored Collections",
            code: "def()"
        }

    }
}
