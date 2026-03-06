const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("Hellow World")
});

app.get('/api/courses',(req,res)=>{res.send([1,2,3,4,5])})

app.get('/api/courses/:id/:name',(req,res)=>{res.send(req.params)});

app.get('/404',(req,res)=>{res.status(404).send("<h1>No Route Found</h1>")})
// app.post();
// app.put();
// app.delete();
const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on port ${port} .....`)});