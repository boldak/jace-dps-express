let series = require("./series-meta")
let { flatten} = require("lodash")


series = series.map( s => s.values.map( v => ({
	column: v.field,
	category: s.category,
	title: v.title,
	description: `${s.category}: ${v.title}`
})))

console.log(JSON.stringify(series, null, " "))
