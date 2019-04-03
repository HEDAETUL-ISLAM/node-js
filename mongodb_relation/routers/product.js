const express=require('express');
const {Product,validateProduct}=require("../model/product")
const router=express.Router();

router.post("/",async(request,response)=>{
    const{error}=validateProduct(request.body);

    if(error) return response.status(400).send(error.details.map(e=>e.message));

    const product=new Product(request.body)
    product.save();

    return response.status(200).send(request.body);
});



router.get("/",async(request,response)=>{
    try{
        const products=Product.find()
        return response.status(200).send(products);
    }catch(err){
        response.status(404).send(err);
    }


});



module.exports=router;