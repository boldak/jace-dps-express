module.exports = [
	require("./uri/ip"),
	require("./uri/info"),
	require("./google-news/google-news"),
	require("./dict/countries"),
	require("./elasticsearch/elasticsearch"),
	// require("./nlp-uk/token"),
	// require("./nlp-uk/ner")
]
.concat(require("./cypher"))
.concat(require("./mysql"))
.concat(require("./plantuml"))
.concat(require("./mongodb"))
.concat(require("./github"))
.concat(require("./jace-nlp"))
.concat(require("./dataverse"))
.concat(require("./data"))


	