const http = require('http');

const server =  http.createServer((req,res)=>{
    if(req.url === "/"){
        res.write("Hello world");
        res.end();
    }

    if(req.url ==="/api/courses"){
        res.write(JSON.stringify([1,2,3,4,5]))
        res.end();
    }
});

server.on("connection",(socket)=>{
    console.log("New connection")
})
server.listen(3001);

console.log("Listenign on port 3001...")
