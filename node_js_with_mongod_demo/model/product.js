const mongoose = require("mongoose");
const Joi = require("joi");


const productScema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        minLength: 3,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        maxLength: 50,
        minLength: 3,
    },
})
const Product = mongoose.model('Product',productScema);

//manually
// const validate = (product)=>{
//     if(product.name.length > 3 && product.catagory.length > 3){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

//by joi

const validate = (product)=>{
    const scema={
        name: Joi.string().maxLength(50).minLength(3).required(),
        price: Joi.Number().require(),
        catagory: Joi.string().maxLength(50).minLength(3).required(),
    }
    return Joi.validate(product,scema);
}

module.exports = {Product,validate};