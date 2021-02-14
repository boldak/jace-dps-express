const path = require("path")

module.exports = {
	
	lang: process.env.LANG || "uk",

	models: {
		destDir: path.resolve( __dirname, './MITIE-models'),
		source:{
			en: {
				name:'English',
				file: path.resolve( __dirname, './build/data/en_model.zip')
			},

			uk: {
				name:'Ukrainian',
				url:'https://lang.org.ua/static/downloads/ner_models/uk_model.dat.bz2'
			},

			ru: {
				name:'Russian',
				url:'https://lang.org.ua/static/downloads/ner_models/ru_model.dat.bz2'
			}
		}
	},
	
	python: {
		mode: 'text',
		encoding: 'utf8',
		pythonOptions: ['-u'],
		scriptPath: './src/python/',
		pythonPath: 'python.exe' //'C:/Apps/Python/python.exe' //'C:/Users/bolda/AppData/Local/Programs/Python/Python38/python.exe' //'C:/Apps/Python/Python38/python.exe'
	},
	
	port: process.env.PORT || 3000

}


module.exports = {

	service:{
		name: process.env.SERVICE_NAME || "jace-dps",
		mode: process.env.NODE_ENV || "development",
		port: process.env.PORT || 8098,
		host: process.env.HOST || "localhost",
		public:"./.tmp/public",
		upload:"./.tmp/uploads"
	}

}
