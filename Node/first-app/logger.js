
var url = "http://mylogger.io/log";
const {emitter} = require("./event");
const {files} = require("./file")


 function log(message){
    console.log(message , url);
    emitter.emit("logging",{files:files})
}

log("Log file called")

module.exports.log = log;

