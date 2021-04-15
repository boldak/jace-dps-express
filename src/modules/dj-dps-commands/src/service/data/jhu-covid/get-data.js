
let dataProvider = require("./lib/jhu-covid-dataset")

class ServiceDataGhuError extends Error {
  constructor(message) {
    super(message);
    this.name = "cypher service error";
  }
}

module.exports = {
    name: "service.data.ghuCovid.get",

    synonims: {
        "service.data.ghuCovid.get": "service.data.ghuCovid.get"
    },

    "internal aliases":{
        "query": "query"
    },

    defaultProperty: {
        "service.data.ghuCovid.get": "query"
    },

        execute: function(command, state, config) {

	        command.settings.query = command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data)
            console.log(command.settings.query)
            
	        if(!command.settings.query){
	            throw new ServiceDataGhuError("no query available")
	        }
	        
	        return new Promise( (resolve, reject) => {
                dataProvider(command.settings.query)
                .then(res => {
                    state.head = {
                        type: "json",
                        data: res
                    }
                    resolve( state )
                })
                      
               .catch(e => {
                    reject( new ServiceDataGhuError(e.toString()))
                });
            })
    	},

    help: {
        synopsis: "Tokenize document",

        name: {
            "default": "rank",
            synonims: []
        },
        input:["table"],
        output:"table",
        "default param": "indexes",
        params: [{
            name: "direction",
            synopsis: "Direction of iteration (optional)",
            type:["Rows", "row", "Columns", "col"],
            synonims: ["direction", "dir", "for"],
            "default value": "Columns"
        }, {
            name: "indexes",
            synopsis: "Array of 0-based indexes of items that will be ranked (optional)",
            type:["array of numbers"],
            synonims: ["indexes", "items"],
            "default value": []
        }, {
            name: "asc",
            synopsis: "Define order (optional)",
            type:["A-Z", "az", "direct", "Z-A", "za", "inverse"],
            synonims: ["order", "as"],
            "default value": "A-Z"
        }],
        example: {
            description: "Rank first column values",
            code:   "load(\r\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\r\n    as:\"dataset\"\r\n)\r\nproj([\r\n  { dim:'time', role:'row', items:[] },\r\n  { dim:'indicator', role:'col', items:[] }\r\n])\r\n\r\nrank(for:\"col\",items:[0],as:\"az\")\r\n\r\norder(by:0, as:\"az\")\r\n\r\n"
        }
    }
}

