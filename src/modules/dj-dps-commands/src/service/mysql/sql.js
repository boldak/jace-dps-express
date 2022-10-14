const util = require("util");
const { isString } = require("lodash")

module.exports = {
  name: "sql",
  synonims:{
    "sql" : "sql"
  },
  
  defaultProperty:{},

  execute:function(command,state,config){
    try{  
      state.head = {
        data: (isString(state.head.data)) ? state.head.data : JSON.stringify(state.head.data),
        type: "string"
      }
    }catch(e){throw e}   
    
   return state;
  },

  help:{
    synopsis:"Convert script context to string",
    
    name:{
      "default" : "string",
      synonims:["string","str", "text"]
    },
    input:["any"],
    output:"string",

    "default param": "none",
    
    params:[],
    
    example:{
      description:"Convert string value '[1,1,1]' to string value '[1,1,1]'",
      code:"<?json\r\n    [1,1,1]\r\n?>\r\n\r\ntext()\r\njson()\r\ntext()\r\n"

    }
  }
}