const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
  { id: 1, name: 'Action' },  
  { id: 2, name: 'Horror' },  
  { id: 3, name: 'Romance' },  
];

router.get('/',(req,res)=>res.status(200).send(genres))

router.get('/:id',(req,res)=>{
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("Invalid genre id.");
    res.send(genre)
});

router.post('/',(req,res)=>{
    const {error,value} = validategenre(req.body);
    if(error) return res.status(400).send(error.message);
    
    let newGenre = {
        id : genres.length +1,
        name : req.body.name
    }
    genres.push(newGenre);
    res.send(newGenre); 
})

router.put('/:id',(req,res)=>{
    let genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("Invalid genre id.");

    const {error,value} = validategenre(req.body);
    if(error) return res.status(400).send(error.message);

    genre.name = req.body.name;
    res.send(genre);
})

router.delete('/:id',(req,res)=>{
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

module.exports = router;
