const express=require('express');
const mongoose=require('mongoose');
const products=require('./routers/product');
const suppliers=require("./routers/supplier");

const app=express();

mongoose.connect("mongodb://localhost/mongo-rel",
    {
        useNewUrlParser:true,
        useCreateIndex:true
    })
    .catch(()=>console.log("connect with mongodb"))
    .catch(()=>console.log("cannot connect"));


app.use(express.json());
app.use('/api/products',products)
app.use('/api/suppliers',suppliers)
app.listen(3000,()=>console.log("listening port 3000"))