const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");
const GithubError = require("./gh_error")




module.exports = {
    name: "service.github.createProvider",

    synonims: {},

    "internal aliases": {
        // "query": "query",
        // // "selector": "query",
        // // "filter": "query",
        // // "sort": "sort",
        // // "orderBy":"sort",
        // // "aggregate": "aggregate",
        // "from":"collection",
        // "collection":"collection",
        // "on":"on",
        // "at":"on"
          
    },

    defaultProperty: {
        // "service.mongodb": "query",
        // "service.mongodb.find": "query"
    },

    execute: function(command, state, config) {
        
        return new Promise((resolve, reject) => {
        try {	
        	const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 94288,
  	privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAzfAR8pXV8TlF9Mjd44wXFvVRBodxFCo69aZVSuWx0kbCTApn
z0JX9pu76t9sfXKpSZXfYolzwa3SHQzctTiua9F4PVTlU6GG+3hzPgnnjU3HdjAr
ziPjpTEeUyioQbaDOi2kqr7VWZLL2FGnDBsLNKv0pRPVGmOeTNMBKg82RvqRJ7oM
6+dakmXBRVyxyHXvDiZ6YNlfxHl6ZpyqBhyC6cr8zzOhHXK49DVeyCqFA6/g9l/R
1GoP/Ft4KRUedYUzDOsc7CMa5DmvYL+FoMvksiKLv8A8ziBDTW/x5nOgnm7Gpt46
1VRlsHrgrZv1rmS1lwd0BDFGcUTSnDeLm/cRCQIDAQABAoIBAQCOHg2Utnh1RwwS
+IfAH45Tpqnq8o9D1jzoB4i27jrAHVq6tTecnXEs255cYSFylS1kfcwyKR88WqM0
rwqk+V/NQjpTQQIdq8wGQMJu3tDv/+wVkPq6AKR5/KKrytQKvVRkUtlfh+CeNyL7
vqWkQgmCqORlA4G9+19kLv2Ps/3GDql/GdJvoF/nSznzqvfNN73cB3xlPtr+UCvr
BBxeVOC7ucUvvWUl0vel/OkocoukdvV8XVMF/uxtdOWxl8anoraKP9Ix9PrjBNOk
KONOIKIQsx3oB/EK0Gf8Mqwumfr9JlSlN7jXMRF6N90A/u/wwS4iPwMWvVeezsia
OjyDsGsBAoGBAPVm4oUrTst0NvX8VH6avQ2fNmC82KPBT3bBPDKe1Rvx+FViBrfU
boNcUiAtLuKv5MXouewelSZVZDw/SVarQxFSg2D40Ly/mV2a+MEIqGU5uDzZZtIo
3kizFoQfUaglvpE+7sc7HkoPARiFi8nrFr0zEaQSx3mekWwUJNF48jShAoGBANbU
4LD6y+xxFVUe5xE7hlD+hBk6nJWyU/NKz7CZPzkAsgdAyKZ/Z+zALjE2BW5+3XlH
cmFhkn3vEijOjkpx/S0yOhBnaJjF2HXnDmQl0qfq0LYpFHB3OyL/UI6SgfSJaa0k
QiBIYWIQ/PEgdjACiRZjSSoboCjwQbulXFMBgptpAoGAXmUB8wmSmI4OahZyhfSN
jgTVDOb3Sh4cq+hueGZCQSqVRHqdbO7Ix7ymVnwq0cWo8Tuw8JNe+czU7pvFYRIl
jS85G/75g/ELVEc9MjtbUvyd0sIpW+OehUZl/dJyPYSvRf14Kaii4Qfeewk7mSLV
r1dKjNswYabN903UT8L/H6ECgYAoeUS3sxhWPFvThJXt5jQA8GJ8ylET1twAGxkT
4VtK5vmjai4jSB+ROAe717ygO6CIJ9DBzfsmZLMcIwYlumIDcNIFoyXOmn+Ufup0
LbgJULDvkL+8DIqEpmtL4QhAxN628vzOTjSioCa3WvFJTED9ickP+NJsxA7uRlIl
hURQ+QKBgQDuPPEHCRpmkZMmsZv9ot9qimhOFDn3jWzvQkouJkUTm7heoEbm4ezh
Nk+PhRWD6pHzlaflojVywSCOXmw8nMfpI/GMoqL/JuTXFj10SE7Iec2NfvJxP+PA
INeqwV5t5GCsrs8P7K0cblyqzzgwR6X/En3iyTeUpsnpdDm68SG3WA==
-----END RSA PRIVATE KEY-----
`,
    // optional: this will make appOctokit authenticate as app (JWT)
    //           or installation (access token), depending on the request URL
    installationId: 13786517,
  },
})
state.head = {
    type: "object",
    data: appOctokit
}        	
        	resolve(state)

    } catch (e) {
    	reject(new GithubError(e))
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