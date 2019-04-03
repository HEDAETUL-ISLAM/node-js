const mongoose = require("mongoose");
const Joi = require("joi");

const productScema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 255,
        minLength: 3,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        maxLength: 255,
        minLength: 3,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
    }
})
const Product = mongoose.model('Product',productScema);

const validateProduct = (product)=>{
    const scema={
        name: Joi.string().maxLength(255).minLength(3).required(),
        price: Joi.Number().require(),
        catagory: Joi.string().maxLength(255).minLength(3).required(),
        price: Joi.Number().require(),
        supplier: Joi.string(),
    }
    return Joi.validate(product,scema,{abortEarly: false});
}

module.exports = {Product,validateProduct};