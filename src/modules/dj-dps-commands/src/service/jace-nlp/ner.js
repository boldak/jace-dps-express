let iconv = require('iconv-lite');
// iconv.extendNodeEncodings();


let Promise = require("bluebird");
let axios = require('axios');
let _ = require('lodash-node')
let JaceNlpError = require("./jace-nlp-error")

let request = {
  
  method: 'post',
  
  url: "https://jace-text.herokuapp.com/ner/extract_entities?extract_sentences=false",
  
  headers: { 
    "Content-Type": "text/plain",
    "accept": "application/json" 
  }
}

// var impl = params => {

//     if (params.options) {
//         params.options.responseType = "arraybuffer"
//         return axios(params.options)
//                     .then(function(result) {
//                         let ctype = result.headers["content-type"];

//                         if (ctype.includes("charset=windows-1251"))
//                             var data = iconv.decode(result.data, 'windows-1251');
//                         else
//                             data = iconv.decode(result.data, 'utf-8'); 
                       
//                        return data
//                     })
//                     // .catch(function(e) {
//                     //     reject(new SourceImplError(e.toString()))
//                     // })
//     }

//     throw new SourceImplError("Request options not found");
// }

module.exports = {
    name: "service.nlp.namedEntities",

    synonims: {
        "service.nlp.namedEntities": "service.nlp.namedEntities",
        "service.nlp.ner": "service.nlp.namedEntities",
    },

    "internal aliases": {
        "source": "source"
    },

    defaultProperty: {
        "service.nlp.namedEntities" : "source",
        "service.nlp.ner" : "source",
          
    },

    execute: function(command, state) {

        let source = command.settings.source || state.head.data
        return new Promise((resolve, reject) => {

            request.data = source
            axios(request)
                .then(response => {
                    state.head = {
                        type: "json",
                        data: response.data.data
                    }

                    resolve(state)
                })
                .catch( e => {
                    reject(new JaceNlpError(e.toString()))
                })
        })
    },    


    help: {
        synopsis: "Get data from source. Available sources: dataset, cached data, external url",
        name: {
            "default": "source",
            synonims: ["source", "src"]
        },
        "default param": "None. Shuld be assigned one from: 'dataset', 'cache', 'url'",

        input: ["any"],
        output: "type of fetched data",

        params: [{
            name: "dataset",
            synopsis: "UUID for dataset (optional). Use command 'meta()' for find datasets.",
            type: ["dataset UUID"],
            synonims: ["dataset", "ds"],
            "default value": "undefined"
        }, {
            name: "cache",
            synopsis: "UUID for cached data (optional). Use command 'cache()' for cache context. ",
            type: ["cached data UUID"],
            synonims: [],
            "default value": "undefined"
        }, {
            name: "url",
            synopsis: "Url for data (optional). You can process external data via url.",
            type: ["url"],
            synonims: ["url", "uri", "ref"],
            "default value": "undefined"
        }],
        example: {
            description: "Get data from various sources",
            code: "load(\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\n    as:'dataset')\n\nload(\n    cache:'5855481930d9ae60277a474a',\n    as:'table'\n)\n\nimport(\n    url:'http://127.0.0.1:8080/api/resource/scripting-js.js',\n    as:'javascript'\n)\n\nload(\n    url:'http://127.0.0.1:8080/api/resource/scripting-csv.csv',\n    as:'csv'\n)\n\nload(\n    url:'http://127.0.0.1:8080/api/resource/scripting-xml.xml',\n    as:'xml'\n)\n\nload(\n    url:'http://127.0.0.1:8088',\n    as:'html'\n)\n"

        }

    }
}
