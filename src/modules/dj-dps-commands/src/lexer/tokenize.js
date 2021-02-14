let Promise = require("bluebird")
const LexerError = require("./lexer_error")
const lexing = require('lexing')
const _ = require("lodash-node")


module.exports = {
    name: "lexer.tokenize",

    synonims: {
    },

    "internal aliases": {
        "source": "source",
        "rules":"rules",
    },

    defaultProperty: {
        "lexer.tokenize": "rules",
    },

    execute: function(command, state, config) {
        
        let data = command.settings.source 
        let rules = command.settings.rules
        
        if(!rules) throw new LexerError("Rules not defined")

        try {
            rules = rules.map( rule => [
                rule.match,
                match => lexing.Token(
                            rule.token, 
                            ( !_.isUndefined(rule.returns)) 
                                ? ( _.isNull(rule.returns))
                                    ? null 
                                    : match[rule.returns]
                                : (!_.isUndefined(rule.token))
                                    ? match[0]
                                    : null
                        )            
            ])
        } catch (e) {
            throw new LexerError(`Cannot parse rules. ${e.toString()}`)            
        }   

        return new Promise((resolve, reject) => {

            try {   
                let tokenizer = new lexing.Tokenizer(rules);
                let input = new lexing.StringIterator(data)
                let output = tokenizer.map(input);
                let res = []
                let token
                do {
                   token = output.next();
                  res.push(token)
                } while (token.name !== 'EOF');
                
                state.head = {
                    type: "json",
                    data: res
                }
                resolve(state)

            } catch (e) {
                reject(new LexerError(e.toString()))
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