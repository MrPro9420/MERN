const config = require('config');
const debug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');
const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger.middleware')
const Auth = require('./middleware/Auth.middleware');
const app = express();
const morgan = require('morgan');

app.set('view engine','pug'); //other view engines {EJS , Mustach ,Pug}
app.set('views','./views')

// app.set('etag', false);   //desable etag and catching
// process.env.NODE_ENV     //returns application environment
app.use(express.json());
// app.use(express.urlencoded()); //used for getting form data in body
app.use(express.static('public'));
app.use(Auth);
app.use(logger);

dbDebug(app.get('env')); //set DEBUG ENV to that debug name space
// console.log(process.env.NODE_ENV)


// console.log(`Application Name : ${config.get('name') }`);
// console.log(`Application Mail server Name : ${config.get('mail.host') }`);
// console.log(`Application Mail server Pass : ${config.get('mail.password')}`);
// console.log(`Application DB server Name : ${config.get('db.host')}`);
// console.log(`Application DB server Pass : ${config.get('db.password')}`);



// To SetAPP ENV TO PRODUCTION RUN CMD {Set NODE_ENV=production}

if(app.get('env') === "development"){
debug("Morgan Enabled");
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(morgan('tiny'));
}

let courses = [
    {id:1,name:"JAVA"},
    {id:2,name:"JS"},
    {id:3,name:"SQL"},
    {id:4,name:"PYTHON"},
    
]

app.get('/',(req,res)=>{
    // res.status(200).send("Hellow World")
    res.render('index',{title:"My express App", message:"Hello Welcome"});
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