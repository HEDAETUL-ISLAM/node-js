const express=require('express');
const {Suppplier,validateSupplier}=require("../model/suppliers")
const router=express.Router();

router.post("/",async(request,response)=>{
    const{error}=validateSupplier(request.body);

    if(error) return response.status(400).send(error.details.map(e=>e.message));

    const supplier=new Suppplier(request.body)
    supplier.save();

    return response.status(200).send(request.body);
});



router.get("/",async(request,response)=>{
    try{
        const suppliers=Supplier.find()
        return response.status(200).send(suppliers);
    }catch(err){
        response.status(404).send(err);
    }


});



module.exports=router;