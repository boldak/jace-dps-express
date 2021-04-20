
let axios = require("axios")
let { template, extend, flatten, groupBy, values, orderBy } = require("lodash")
let Promise = require("bluebird")

let regionsUrl = "https://health-security.rnbo.gov.ua/api/dictionary/regions"

let data = []
let series = require("./series-meta")

let get = ( object, path ) => {
	let res = object
	path.split(".").forEach( p => {
		if(res) res = res[p]
	})
	
	return res
}

axios({
	method:"GET",
	url: regionsUrl
}).then( resp => {
	// console.log(resp.data)
	data = resp.data.map( r => ({
		regionId: r.id,
		regionName:r.label
	}))
	return data
})

// .then( data => 
// 	Promise.all( flatten( data.map( d => 
// 		series.map( serie => 
			
// 			axios({
// 				method:"GET",
// 				url: template(serie.urlTemplate)({regionId:d.id})
// 			}).then( resp => {
// 				return get(resp.data, serie.dates) .map( (date, index) => {
// 					let res = extend({}, d, {date})
// 					serie.values.forEach( f => {
// 						// try {
// 							let ff = get(resp.data, f.variable)
// 							res[f.field] = (ff) ? ff[index] : null	
// 						// } catch(e) {
// 						// 	console.log(f.variable, resp.data)
// 						// 	throw new Error(e.toString())
// 						// }
						 
// 					})
// 					return res
// 				})

// 			})

// 	))))
// )

.then( data => {
	let $d = 
		flatten(
			data.map( d => series.map( serie => ({
				region: d,
				serie,
				url:template(serie.urlTemplate)({regionId:d.regionId})
			})))
		)
	// return $d	
	return Promise.reduce(
		$d,
		(acc, item) => {
			// console.log(item.region.regionName, item.url)
			return axios({
				method:"GET",
				url: item.url
			}).then( resp => {
				try {
				let dates = get(resp.data, item.serie.dates) 	
				if(dates) {
					return dates.map( (date, index) => {
						let res = extend({}, item.region, {date})
						item.serie.values.forEach( f => {
								let ff = get(resp.data, f.variable)
								res[f.field] = (ff) ? ff[index] : null	
						})
						res.url = item.url
						return res
					})	
				} else {
					return []
				}  
				


				} catch(e) {
					console.log("ERROR", item.url, resp.data, item.serie.dates)
				}

			})
			.then( res => {
				// setTimeout(()=>{
					acc = acc.concat(res)
					return acc	
				// }, 100)
				
			})
		},
		[]
	)


})


.then( data => {

	data = 
	orderBy (
		flatten(
			values(groupBy(flatten(data), d => d.date))
				.map( g => 
					values(
						groupBy(g, g => g.regionId)
					).map( v => {
						let res = {}
						v.forEach( t => extend(res,t))
						return res
					})
				)
		),
		"date", "asc"
	)			

	console.log(JSON.stringify(data,null, " "))
	// console.log(groupBy([{a:6.1}, {a:4.2}, {a:6.3}], d => Math.floor(d.a)))
})

