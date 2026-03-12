
const express = require('express');
const Joi = require('joi');
const port = process.env.PORT || 3002
const app = express();
app.use(express.json())

const genres = [
  { id: 1, name: 'Action' },  
  { id: 2, name: 'Horror' },  
  { id: 3, name: 'Romance' },  
];

app.get('/api/genres',(req,res)=>res.status(200).send(genres))

app.get('/api/genres/:id',(req,res)=>{
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("Invalid genre id.");
    res.send(genre)
});

app.post('/api/genres',(req,res)=>{
    const {error,value} = validategenre(req.body);
    if(error) return res.status(400).send(error.message);
    
    let newGenre = {
        id : genres.length +1,
        name : req.body.name
    }
    genres.push(newGenre);
    res.send(newGenre); 
})

app.put('/api/genres/:id',(req,res)=>{
    let genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("Invalid genre id.");

    const {error,value} = validategenre(req.body);
    if(error) return res.status(400).send(error.message);

    genre.name = req.body.name;
    res.send(genre);
})

app.delete('/api/genres/:id',(req,res)=>{
    let genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("Invalid genre id.");

    let index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
})

function validategenre(genre){
    const genreSchema = Joi.object({
        name : Joi.string().required()
    })
    return genreSchema.validate(genre);
}

app.listen(port,()=>{console.log(`App ruuning on port ${port}`)})
