let _  = require("lodash-node")
let types = _.pairs(require("./mysql-types.js"))
let moment = require("moment")

// console.log(types)

let getType = type => ( _.find(types, t => t[1] == type) || [] )[0]

// for(let i=0; i<255; i++){
// 	console.log(i,getType(i))
// }

module.exports = (value, type) => {
	if(_.isNull(value) || _.isUndefined(value)) return "null"
	type = getType(type)
	if( !type ) return "undefined type"
	
	switch (type) {
			// case 'DECIMAL':                                                                                                                                       
  // 		case 'TINY':                                                                                                                                          
  // 		case 'SHORT':                                                                                                                                         
  // 		case'LONG':                                                                                                                                         
  // 		case'FLOAT':                                                                                                                                         
  // 		case'DOUBLE':                                                                                                                                        
  // 		case'NULL':                                                                                                                                         
			  case'TIMESTAMP': return moment(new Date(value)).toString()                                                                                                                                     
			  // case'LONGLONG'                                                                                                                                      
			  // case'INT24'                                                                                                                                         
			  case'DATE': return moment(new Date(value)).format("YYYY-MM-DD")                                                                                                                                        
			  case'TIME': return moment(value.toString(), "HH:mm:ss").format("HH:mm:ss")                                                                                                                                        
			  case'DATETIME': return moment(new Date(value)).format("YYYY-MM-DD HH:mm:ss")                                                                                                                                    
			  case'YEAR': return moment(value.toString()+"01-01", "YYYY-MM-DD").format("YYYY")                                                                                                                                        
			  case'NEWDATE': return moment(new Date(value)).toString()                                                                                                                                      
			  // case'VARCHAR'                                                                                                                                      
			  // case'BIT'                                                                                                                                          
			  // case'JSON':                                                                                                                                        
			  // case'NEWDECIMAL'                                                                                                                                  
			  // case'ENUM'                                                                                                                                        
			  // case'SET'                                                                                                                                         
			  case'TINY_BLOB': return "blob"                                                                                                                                  
			  case'MEDIUM_BLOB': return "blob"                                                                                                                                
			  case'LONG_BLOB': return "blob"                                                                                                                                  
			  case'BLOB': return "blob"                                                                                                                                       
			  // case'VAR_STRING'                                                                                                                                  
			  // case'STRING'                                                                                                                                      
			  // case'GEOMETRY'
			  default: return (value) ? value.toString() : "null"        

	}	

}
