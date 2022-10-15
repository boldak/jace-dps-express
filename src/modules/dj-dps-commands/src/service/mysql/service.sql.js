
const mysql = require('mysql2');
const {find, isArray, keys, values} = require("lodash");


// create the connection pool
const connectionUrl =
    process.env.JAWSDB_URL ||
    'mysql://i8j0vk8kfyidr7mb:x3ibhlusf8oaxd11@ivgz2rnl5rh7sphb.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/x4mspp0ssyvlauv8'

const pool = mysql.createPool({
  uri:connectionUrl,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



class SqlImplError extends Error {
    constructor(message) {
        super(message);
        this.name = "sql service error";
    }
}



let Table = require('cli-table3')


let formatValue = require("./format-value") 

const lineCommentRE = /(-- [\w\S\ .\t\:\,;\'\"\(\)\{\}\[\]0-9-_]*)(?:[\n\r]*)/gi;
const inlineCommentRE = /(\/\*[\w\W\b\.\t\:\,;\'\"\(\)\{\}\[\]\*0-9-_]*)(?:\*\/)/gim;



module.exports = {
    name: "service.sql",

    synonims: {
        "service.sql": "service.sql",
        "service.mysql": "service.sql",
    },

    "internal aliases": {
        "query": "query",
        "selector": "query",
        "permission":"permission",
        "available":"permission"
    },

    defaultProperty: {
        "service.sql": "query",
        "service.mysql": "query"
    },

    execute: function(command, state, config) {
        
        let query = command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data)
        
        command.settings.permission = command.settings.permission || [] 
        command.settings.permission = command.settings.permission.map( p => p.toUpperCase())
        
        if (!query) throw new SqlImplError(`No SQL query available`)
        
        query = query.replace(lineCommentRE,"").replace(inlineCommentRE,"").trim()
        
        
        if (!query) throw new SqlImplError(`No SQL query available in\n ${command.settings.query || ((command.settings.data) ? command.settings.data : state.head.data)}\n`)
        

        let statement = query.split(/\s/)[0].toUpperCase()
        if(!find(command.settings.permission, p => p == statement)) throw new SqlImplError(`No permission for execute ${statement} \n ${query}\n`)
        
        let connection    
        return new Promise((resolve, reject) => {
            pool.promise().getConnection()
                .then(c  => {
                    connection = c
                    return connection.query({sql:query, nestTables:"."})
                })
                .then(([results, fields]) => {
                    connection.release()
                      if (!isArray(results)) {
                      
                          return {
                              query: command.settings.query,
                              text: keys(results).map(k => `${k}: ${JSON.stringify(results[k])}`).join(", ") + "\n"
                          }
                      
                      } else {
                        var table = new Table();
                            table.push(fields.map(f => f.name))
                            results.forEach(row => {
                            table.push(values(row).map( ( v, index ) => formatValue(v, fields[index].columnType)))
                        })
                        
                        return {
                              query: command.settings.query,
                              fields: fields.map( f => ({name:f.name, columnType:f.columnType})),
                              data: results,
                              text: table.toString().replace(/\u001b\[90m/g,"").replace(/\u001b\[39m/g, "") + "\n"
                        }
                      }
                })
                .then(res => {
                    state.head = {
                        type: "json",
                        data: res
                    }
                    resolve(state)
                })
                .catch(err => {
                    if(connection) connection.release()
                    reject(new SqlImplError(
                       (err.errno) ? `SQL Error ${err.errno}: ${err.sqlMessage}\n${command.settings.query}` : err.toString()
                    ))
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