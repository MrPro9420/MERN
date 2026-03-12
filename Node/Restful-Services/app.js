const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

let courses = [
    {id:1,name:"JAVA"},
    {id:2,name:"JS"},
    {id:3,name:"SQL"},
    {id:4,name:"PYTHON"},
    
]

app.get('/',(req,res)=>{
    res.send("Hellow World")
});

app.get('/api/courses',(req,res)=>{res.send(courses)})

app.get('/api/courses/:id/:name',(req,res)=>{res.send(req.params)});

app.get('/api/courses/:id',(req,res)=>{
   let course =  courses.find(course=> course.id === parseInt(req.params.id));
   if(!course) res.status(404).send("No Data found");
   res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{

    let course =  courses.find(course=> course.id === parseInt(req.params.id));
   if(!course) return res.status(404).send("No Data found");
    const {error} = validateSchema(req);
     if(error){
        res.status(400).send(error.message);
        return;
    }

    course.name = req.body.name
    res.send(course)

});

app.post('/api/courses',(req,res)=>{
    
    const {error} = validateSchema(req);

    if(error){
        res.status(400).send(error.message);
        return;
    }
    // res.send(req.body.name)
    const course = {
        "id":courses.length+1,
        "name": req.body.name
    };

    courses.push(course);
    res.send(course)
})

app.get('/404',(req,res)=>{res.status(404).send("<h1>No Route Found</h1>")})

app.delete('/api/courses/:id',(req,res)=>{
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course){
        res.status(400).send("No record found");
        return;
    }
    let index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course)
})

const port = process.env.PORT || 3001;
app.listen(port,()=>{console.log(`Listening on port ${port} .....`)});

function validateSchema(req) {
    const schema = Joi.object( {
        name : Joi.string().required().min(3),
    })

    return schema.validate(req.body);
}