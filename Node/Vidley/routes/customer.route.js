
const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require('joi');
const debug = require('../debugger');






const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Customer = mongoose.model('Cunstomer', customerSchema);

router.get('/', async (req, res) => {

    let Allcustomers = await Customer.find();
    res.status(200).send(Allcustomers);
})

router.get('/:id', async (req, res) => {
    let customer = await Customer.findById(req.params.id);
    if (!customer) res.status(400).send("No customer found")
    res.status(200).send(customer)
})

router.post('/', async (req, res) => {
    const { error, value } = validateCustomer(req);
    if (error) return res.status(400).send(error.message);

    const newcustomer = new Customer(req.body);
    try {
        const customer = await newcustomer.save();
        res.status(200).send(customer);
    } catch (err) {
        console.log(err.message)
    }

}
);

router.put('/:id', async (req, res) => {
    const { error, value } = validateCustomer(req);
    if (error) return res.status(400).send(error.message);
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedCustomer)
    } catch (err) {
        console.log(err.message)
    }

})

router.delete('/:id', async (req, res) => {

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        res.send(deletedCustomer)
    } catch (err) {
        console.log(err.message)
    }

})
function validateCustomer(req) {
    const customerSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean().required().default(false)
    });

    return customerSchema.validate(req.body);
}


module.exports = router;