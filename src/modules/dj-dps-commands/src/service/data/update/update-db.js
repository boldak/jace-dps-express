
const Proxy = require("./lib/ddp/proxy")
const moment = require("moment")


let updater = {
    covid_nszu:null,
    covid_owid: null,
    OxCGRT_indexes: null,
    OxCGRT_notes: null,
    sota: null
}

let status = {
    covid_nszu:{},
    covid_owid: {},
    OxCGRT_indexes: {},
    OxCGRT_notes: {},
    sota: {}
}

let updateConfig = require("./config")

let logger = require("./lib/logger")


class DataImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "UPDATE DB service error";
    }
}


module.exports = {
    name: "service.data.db.update",

    synonims: {
        "service.data.db.update": "service.data.db.update"
    },

    "internal aliases": {
        "db": "db"
    },

    defaultProperty: {
        "service.data.db.update": "db"
    },

    execute: function(command, state, config) {
        
        let db = command.settings.db || ((command.settings.data) ? command.settings.data : state.head.data)
        if (!db) throw new DataImplError(`No db available`)

        // logger.print("Update", db) 
        // logger.print(updateConfig)   

        return new Promise((resolve, reject) => {

            if( status[db].complete && status[db].updatedAt){
                if( moment(new Date()).isSame(status[db].updatedAt, 'day')){
                    state.head = {
                        type: "json",
                        data: status[db]
                    }
                    resolve(state)
                    return    
                }
            }

            
            if( updater[db] ) {
                state.head = {
                    type: "json",
                    data: status[db]
                }
                resolve(state)
                return
            } 
                
            logger.print(`${db}: activate ${require.resolve(updateConfig.db[db].updater)}`)
            
            Proxy(require.resolve(updateConfig.db[db].updater))
                .then( p => {
                    
                    updater[db] = p
                    status[db] = { 
                        message :"Prepare update...",
                        complete: false
                    }    

                    logger.print(`${db}: Prepare update...`)
                        
                    updater[db].on("message", message => {
                        logger.print(`${db}: ${JSON.stringify(message)}`)
                        logger.print(`${db}: `)
                        
                        status[db].message = message.status
                    })
                    
                    updater[db].on("close", (code) => {
                        logger.print(`Update status: Latest version`)
                        
                        status[db].message = "Latest version"
                        status[db].complete = true
                        status[db].updatedAt = moment(new Date())
                        
                        
                        updater[db] = null
                    })

                    updater[db].execute({
                        path:"update",
                        dbName: db
                    }).then(res => {
                        // status = res.status
                        state.head = {
                            type: "json",
                            data: status[db]
                        }
                        resolve(state)            
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