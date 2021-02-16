let Promise = require("bluebird");
let axios = require("axios");
let ServiceDataverseError = require("./dv-error")
let config = require("./config").dataverse

module.exports = {
    name: "service.dataverse.search",

    synonims: {
        "service.dataverse.search": "service.dataverse.search",
        "service.dv.search": "service.dataverse.search"
    },

    "internal aliases": {
        "query": "query",
        "search": "query",
        "on": "on",
        "at": "on"
    },

    defaultProperty: {
        "service.dataverse.search": "query",
        "service.dv.search": "query"
    },

    execute: function(command, state) {

        command.settings.on = command.settings.on || config.url
        command.settings.query = command.settings.query || state.head.data

        let options = {
            method:"GET",
            url:`${command.settings.on}/api/search?q=${command.settings.query}`
        }

        // console.log(options)

        return new Promise( (resolve, reject) => {
            axios(options)
                .then( res => {
                    // console.log(res)
                    state.head = {
                        type: "json",
                        data: res.data
                    } 
                    resolve(state)
                })
                .catch (e => {
                    // console.log("## ",e.toString())
                    reject(new ServiceDataverseError(e.toString()))
                })    
        }) 

    },

    help: {
        synopsis: "Save context into cache",
        name: {
            "default": "cache",
            synonims: ["cache", "save"]
        },
        "default param": "none",
        params: [],
        example: {
            description: "Save context into cache",
            code: "load(\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\n    as:'json'\n)\nselect('$.metadata')\nextend()\ntranslate()\ncache()\nselect(\"$.data_id\")\n"
        }

    }
}