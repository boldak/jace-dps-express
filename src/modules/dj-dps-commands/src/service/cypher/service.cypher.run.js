var neo4j = require('neo4j-driver');

var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL  || "bolt://hobby-nlhgecabchbdgbkegbhaepel.dbs.graphenedb.com:24787";
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER || "EDU"
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD || "b.C3oDsxRWmkiT.9tfqNvlO5uEm4KUW";



let http = require('request-promise');
let util = require("util")
let getSelection = require("./util").getSelection


class CypherImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "cypher service error";
  }
}


const GRAPHENEDB_URL = null;
// "https://app83770167-ShU0I2:b.rIQ7MDqlCGPG.UiYEitJt5P1GbpW3@hobby-nlhgecabchbdgbkegbhaepel.dbs.graphenedb.com:24780"
const headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
                        "Authorization": "Basic YXBwODM3NzAxNjctU2hVMEkyOmIucklRN01EcWxDR1BHLlVpWUVpdEp0NVAxR2JwVzM=",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Cookie": "_ga=GA1.2.1756611434.1587206549; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%22c6069a6d-ecce-4bfb-908b-40a067964ee1%22; _gid=GA1.2.1215143817.1587454556; _cio=8c5c3d2d-08a0-2eb7-d30c-c2c04d713438; _graphenedb_token=b.GdfL8KLVTAHe.IC7OrhC2gxCXLDTp0"
                }


module.exports = {
    name: "service.cypher.run",

    synonims: {
        "service.neo4j": "service.cypher.run"
    },

    "internal aliases":{
        "query": "query",
        "selector": "query",
        "on": "url",
        "at": "url",
        "url": "url"
          
    },

    defaultProperty: {
        "service.cypher": "query",
        "service.neo4j": "query"
    },

        execute: function(command, state, config) {

	        command.settings.query = command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data)
	        
            // command.settings.url = (
            //         command.settings.url 
            //         || 
            //         GRAPHENEDB_URL
            //         ||
            //         process.env.GRAPHENEDB_URL 
            //         || "http://127.0.0.1:7474"
            // )+"/db/data/cypher"
            
            // command.settings.populate = command.settings.populate || []
            // command.settings.populate = _.isArray(command.settings.populate) ? command.settings.populate : [command.settings.populate]

	        if(!command.settings.query){
	            throw new CypherImplError("no query available")
	        }
	        
	        return new Promise( (resolve, reject) => {

                let driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass), {encrypted: 'ENCRYPTION_ON'});

                let session = driver.session();

                    session
                        .run(command.settings.query)
                        .then( result => {
                            state.head = {
                                type: "json",
                                data: res
                            }
                            resolve( state )  
                            session.close();
                            driver.close()
                        })

                        .catch(e => {
                            reject( new CypherImplError(e.toString()))
                        });
            })
            .catch(e => {
                reject( new CypherImplError(e.toString()))
            });            

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

