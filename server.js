const express = require('express');
const bodyParser = require('body-parser');
const CORS = require("cors")
const fileUpload = require('express-fileupload');

const config  = require("./config")

const app = express();
app.use(express.static(config.service.public));
app.use(CORS())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : config.service.upload,
    limits: { 
    	fileSize: 1024 * 1024 * 1024 
    }
}));

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json({
	limit: '50mb'
}));

app.all("/*",  (req, res, next) => {  
    req.fullUrl = req.protocol + '://' + req.hostname + ":"+ config.service.port+req.originalUrl
    res.header('Access-Control-Allow-Origin', '*');
    next()
})

// app.use(bodyParser.json())

app.post("/api/script", require("./src/controller"))
 
app.listen(config.service.port, () => {
  console.log(`JACE-DPS  as "${config.service.name}" service starts on ${config.service.host}:${config.service.port}`);
});
