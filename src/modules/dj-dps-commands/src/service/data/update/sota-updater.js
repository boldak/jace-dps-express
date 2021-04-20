	const Controller = require("./lib/ddp/controller")
	const { extend } = require("lodash")
	const stages = require("./lib/stages")
	const moment = require("moment")

	let controller = new Controller()

	controller
		.add("update", (message, master) => {
			
			// master.send(extend({}, message, { status: `Update for ${message.dbName} started...`}))
			stages.checkStatus(message.dbName)
			    .then( config => {
			    	config = extend(config,{ master, message })
			        // master.send(extend({}, message, { status: `Check Sota DB...`, config }))
			        let dbDate = moment(config.updatedAt, config.dateFormat)
			        let now = moment(moment(new Date()).format(config.dateFormat),config.dateFormat) 
			        // master.send(extend({}, message, { status: `${dbDate} vs. ${now}` }))
			        
			        if( dbDate.isBefore(now) ){
						
						master.send(extend({}, message, { status: `Update started...`, config}))
			        	
						stages.prepare(config)

			        	.then( config => {
					        master.send(extend({}, message, { status: `Prepare update...`, config}))
			        	    return stages.fetchSota(config)
			            })
					    
					    .then( config => {
					        master.send(extend({}, message, { status: `${config.insertedRows.length} rows will be inserted...`, config}))
			        	    return stages.insertRows(config)
					    })
					    .then( config => {
					        master.send(extend({}, message, { status: `Update status...`, config}))
			        		return stages.updateStatus(config)
					    })
					    .then( config => {
					      	master.send(extend({}, message, { status: `Latest version`, config}))
							process.exit(0)
					    })


			        } else {
			        	master.send(extend({}, message, { status: `Latest version`}))
						process.exit(0)        	
			        }
			    })



			
		})


	require("./lib/ddp/slave")( controller )
