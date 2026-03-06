const EventEmitter = require("events");

const emitter = new EventEmitter();

// Register   a listner 
emitter.on("messageLogged", (e)=>{
    console.log("Listner Called")
    console.log(e)
})

emitter.on("logging",(e)=>{
    console.log("logging the file"+ e.files)
})
// raise an event
// emitter.emit("messageLogged",{id:1,"url":"https://"});

module.exports = {
    emitter
}