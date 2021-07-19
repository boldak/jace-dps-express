let conf = require("../modules/dj-dps-commands");
let Script = require("../modules/dj-dps-interpreter");


module.exports = (req, resp) => {
        
    var host, script, locale, state;

    let $file = null
    
    if(req.files && req.files.file){
        
        let fileContent = require("fs").readFileSync(req.files.file.tempFilePath)

        $file = {
            path: req.files.file.tempFilePath,
            name: req.files.file.name,
            binary: fileContent,
            text: fileContent.toString()    
        }
    }
    
    // console.log("File:", $file)


    script = decodeURIComponent(req.body.script).toString()
    state = JSON.parse(decodeURIComponent(req.body.state));
    locale = req.body.locale || "en";
    host = req.fullUrl;
    locale = (locale == "uk") ? "ua" : locale;

    state = (state) || {
        locale : locale 
    }
    state.client = req.body.client;
    state.storage = state.storage || {}
    state.storage.$request = req
    state.storage.$file = $file

    let executable = new Script()
        .host(host)
        .config(conf)
        .script(script)
        .run(state)
        .then(result => {
            resp.send(result)
        })
        .catch(error => {
            resp.send({ type: "error", data: error })
        })
}        

