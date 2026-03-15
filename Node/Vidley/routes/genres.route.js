const express = require('express');
const router = express.Router();
const Joi = require('joi');
const debug = require('../debugger');

const genres = [
  { id: 1, name: 'Action' },  
  { id: 2, name: 'Horror' },  
  { id: 3, name: 'Romance' },  
];

router.get('/',(req,res)=>{
    res.send(genres);
})

router.get('/:id',(req,res)=>{
    const genre = genres.find((genre)=>genre.id === parseInt(req.params.id));
    if(!genre){
        res.status(400).send('Invalid genre id');
        return;
    }
    res.send(genre);
})

router.post('/',(req,res)=>{
    const {error ,value} = validategenre(req);
    if(error)  return res.status(400).send(error.message);
    let newGenre = {
        "id" : genres.length+1,
        "name" : req.body.name
    }
    genres.push(newGenre);
    res.send(newGenre);
})

router.put('/:id',(req,res)=>{
    const genre = genres.find((genre)=>genre.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("invalid genre id");
    const {error,value} = validategenre(req);
    if(error) return res.status(400).send(error.message);
    genre.name = req.body.name;
    res.send(genre);
})

router.delete('/:id',(req,res)=>{
    const genre = genres.find((genre)=>genre.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("invalid genre id");
    let index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
})

function validategenre(req){
    let genreSchema = Joi.object({
        name : Joi.string().min(5).required()
    })

    return genreSchema.validate(req.body);
}
module.exports=router;
