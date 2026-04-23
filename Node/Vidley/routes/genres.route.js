const express = require('express');
const router = express.Router();
const Joi = require('joi');
const debug = require('../debugger');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("Connected to db")
}).catch((err) => {
    console.log(err.message)
})

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.status(200).send(genres);
})

router.get('/:id', async (req, res) => {
    if (!isValidId(req.params.id)) return res.status(400).send("Invalid ID format");
    let genre = await Genre.findById(req.params.id)
    if (!genre) {
        res.status(400).send('Invalid genre id');
        return;
    }
    res.send(genre);
})

router.post('/', async (req, res) => {

    const { error, value } = validategenre(req);
    if (error) return res.status(400).send(error.message);
    let newGenre = new Genre({
        "name": req.body.name
    })
    try {
        newGenre = await newGenre.save();
        res.send(newGenre);
    } catch (err) {

        res.send(err.message)
    }

})

router.put('/:id', async (req, res) => {
    const { error, value } = validategenre(req);
    if (error) return res.status(400).send(error.message);
    if (!isValidId(req.params.id)) return res.status(400).send("Invalid ID format");

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genre) return res.status(400).send("invalid genre id");

    res.send(genre);
})

router.delete('/:id', async (req, res) => {
    if (!isValidId(req.params.id)) return res.status(400).send("Invalid ID format");
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (!genre) return res.status(400).send("invalid genre id");
    res.send(genre);
})

function validategenre(req) {
    let genreSchema = Joi.object({
        name: Joi.string().min(5).required()
    })

    return genreSchema.validate(req.body);
}

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
module.exports = router;
