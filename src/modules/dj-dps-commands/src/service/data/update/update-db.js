
const Proxy = require("./lib/ddp/proxy")

let updater= null
let status = ""

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

        console.log("Update", db)    

        return new Promise((resolve, reject) => {
            
            if( updater ) {
                state.head = {
                    type: "json",
                    data: status
                }
                resolve(state)
            } else {
                
                Proxy(require.resolve("./updater.js"))
                    .then( p => {
                        
                        updater = p
                        status = "Prepare update..."
                        
                        updater.on("message", message => {
                            console.log(`Update status: ${message.status}`,message.config)
                            status = message.status
                        })
                        
                        updater.on("close", (code) => {
                            console.log(`Update status: closed`)
                            state = "Latest version"
                            updater = null
                        })

                        updater.execute({
                            path:"update",
                            dbName: db
                        }).then(res => {
                            status = res.status
                            state.head = {
                                type: "json",
                                data: status
                            }
                            resolve(state)            
                        })


                    })
            }

                        
    
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