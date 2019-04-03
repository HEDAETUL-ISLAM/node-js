const mongoose = require("mongoose");
const Joi = require("joi");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        minLength: 3,
        required: true,
    },
    address: {
        type: String,
        maxLength: 255,
        minLength: 3,
        required: true,
    },
})


const Supplier = mongoose.model('Supplier',supplierSchema);

const validateSupplier = (supplier)=>{
    const scema={
        name: Joi.string().maxLength(255).minLength(3).required(),
        catagory: Joi.string().maxLength(255).minLength(3).required(),
    }
    return Joi.validate(supplier,scema,{abortEarly: false});
}

module.exports = {Supplier,validateSupplier};