module.exports = {
	db:{
		url: process.env.MZSUDB_URL || "mongodb+srv://jace:jace@cluster0.53bkx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
		name: "covid_nszu",
		collection: "covid_ua"
}	}