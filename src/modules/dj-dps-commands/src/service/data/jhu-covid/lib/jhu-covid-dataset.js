
const axios = require("axios")
const { template, isArray, find, flatten, extend } = require('lodash')
const csv = require("csvjson")
const moment = require("moment")

const options = {
  delimiter: ",",
  quote: '"'
}


let getUrl = template("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv")


let date = "01-01-2021"

// axios({
// 	method:"GET",
// 	url: getUrl({date})
// }).then(response => {
// 	let res = csv.toObject( response.data, options ).filter( d => d.Country_Region=="Ukraine")
// 	console.log(res)
// })


let getDataLevel1 = query => {
	
	query.region = query.region || []
	query.region = (isArray(query.region)) ? query.region : [query.region] 

	let dates = []
	if (query.date){
		dates.push(moment(query.date).format("MM-DD-YYYY"))
	} else {
		let startsAt = moment(query.startsAt || moment("01-23-2020", "MM-DD-YYYY").toDate())
		let endsAt = moment(query.endsAt || new Date())
		while( endsAt.isSameOrAfter(startsAt)){
			dates.push(startsAt.format("MM-DD-YYYY"))
			startsAt.add(1,"d")
		}
	}

	return Promise.all(dates.map( date => axios({
			method:"GET",
			url: getUrl({date})
		})
		.then(response => {
			let object = csv.toObject( response.data, options )
							.filter( d => find(query.region, r => d.Country_Region == r))
			if( object ){
				return object.map( d => {

					d.date = moment(date+" 12:00","MM-DD-YYYY HH:mm").toDate()
					d.Active = d.Active * 1
					d.Confirmed = d.Confirmed * 1
					d.Recovered = d.Recovered * 1
					d.Deaths = d.Deaths * 1
					// d.Case_Fatality_Ratio = d.Case_Fatality_Ratio * 1
					d.Case_Fatality_Ratio = 100 * d.Deaths / d.Confirmed
					return d
				})	
			}
			return null
			
		})
		.catch( e => {
			console.log( date, e.toString())
		})
	))
	.then( res => flatten(res).filter( d => d))
	
}


const level0Sources = [
	{
		url:"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
		field: "Confirmed"
	},
	{
		url:"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",
		field: "Deaths"
	},
	{
		url:"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv",
		field: "Recovered"
	}	
]


let getDataLevel0 = query => {
	
	query.region = query.region || []
	query.region = (isArray(query.region)) ? query.region : [query.region] 

	let dates = []
	if (query.date){
		dates.push(moment(query.date).format("M/D/YY"))
	} else {
		let startsAt = moment(query.startsAt || moment("1/22/20", "M/D/YY").toDate())
		let endsAt = moment(query.endsAt || new Date())
		while( endsAt.isSameOrAfter(startsAt)){
			dates.push(startsAt.format("M/D/YY"))
			startsAt.add(1,"d")
		}
	}

	return Promise.all(level0Sources.map( s => axios({
			method: "GET",
			url: s.url
		})
		.then(response => csv.toObject( response.data, options )
							.filter( d => find(query.region, r => d["Country/Region"] == r)))
		.then( result => {
			
			let res = []
			
			result.forEach( data => {
				dates.forEach( date => {
					let item = {
						date, 
						Country_Region: data["Country/Region"],
						Long_: data.Long,
						Lat: data.Lat
					}
					item[s.field] = data[date] 
					res.push(item)
				})	
			})
			
			return res

		}))

	).then(res => res[0].map( r => {
		for(let i = 1; i<3; i++){
			let f = find(res[i], item => item.date == r.date && item.Country_Region == r.Country_Region)
			if(f) r = extend({}, r, f)
		}
		
		r.date = moment(r.date+" 12:00","M/D/YY HH:mm").toDate()
		r.Active = r.Confirmed - r.Recovered - r.Deaths
		r.Confirmed = r.Confirmed * 1
		r.Recovered = r.Recovered * 1
		r.Deaths = r.Deaths * 1
		r.Case_Fatality_Ratio = 100 * r.Deaths / r.Confirmed
		
		return r
	}))
}	




module.exports = query =>  (query.level) ? getDataLevel1(query) : getDataLevel0(query)
