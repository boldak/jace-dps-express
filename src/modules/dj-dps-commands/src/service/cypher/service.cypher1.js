var neo4j = require('neo4j-driver');

var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL  || "bolt://hobby-nlhgecabchbdgbkegbhaepel.dbs.graphenedb.com:24787";
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER || "EDU"
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD || "b.C3oDsxRWmkiT.9tfqNvlO5uEm4KUW";


class CypherImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "cypher service error";
  }
}

module.exports = {
    name: "service.cypher",

    synonims: {
        "service.neo4j": "service.cypher"
    },

    "internal aliases":{
        "query": "query",
        "selector": "query",
    },

    defaultProperty: {
        "service.cypher": "query",
        "service.neo4j": "query"
    },

        execute: function(command, state, config) {

	        command.settings.query = command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data)

	        if(!command.settings.query){
	            throw new CypherImplError("no query available")
	        }
	        
	        return new Promise( (resolve, reject) => {

                let driver = neo4j.driver(
                        graphenedbURL, 
                        neo4j.auth.basic(graphenedbUser, graphenedbPass), 
                        {encrypted: 'ENCRYPTION_ON'}
                    );

                let session = driver.session();

                    session
                        .run(command.settings.query)
                        .then( result => {
                            state.head = {
                                type: "json",
                                data: result
                            }
                            resolve( state )  
                            session.close();
                            driver.close()
                        })

                        .catch(e => {
                            reject( new CypherImplError(e.toString()))
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

