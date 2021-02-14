// let natural = require("natural")
// let StemmerUK = require('../lib/stemmers/porter_stemmer_uk');
let langdetect = require('langdetect')
let util = require("util");

class LangDetectImplError extends Error {
  constructor(message) {
    super(message);
    this.name = "nlp lang detect error";
  }
}




module.exports = {
    name: "nlp.content.lang",

    synonims: {
        "nlp.content.lang": "nlp.content.lang"
    },

    "internal aliases":{
        "doc": "doc",
        "docs": "doc"
    },

    defaultProperty: {
        "nlp.content.lang": "doc"
    },

    execute: function(command, state, config) {

        command.settings.doc = (command.settings.doc) ? command.settings.doc : state.head.data
        // command.settings.doc = (util.isArray(command.settings.doc)) ? command.settings.doc : [command.settings.doc]
        // let originalLength = command.settings.doc.length 
        // command.settings.doc = command.settings.doc.filter(item => util.isString(item))
        if(!command.settings.doc){
            throw new StemImplError("no string data detected")
        }

        // command.settings.locale = (command.settings.locale) ? command.settings.locale.toLowerCase() : "en"; //en ru uk 
        
        // let stemmer = (command.settings.locale == "en")
        //                     ? natural.PorterStemmer
        //                     : (command.settings.locale == "ru")
        //                         ? natural.PorterStemmerRu
        //                         : (command.settings.locale == "uk")
        //                             ? StemmerUK
        //                             : natural.PorterStemmer;

                                    

        try {
            
            state.head = {
                type: "json",
                data: langdetect.detect(command.settings.doc)
            }

        } catch (e) {
            throw new LangDetectImplError(e.toString())
        }
        return state;
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

