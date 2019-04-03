const express = require("express");
const mongoose = require("mongoose");
const {Product,validate} = require("./model/product");

const app = express();

mongoose
    .connect("mongodb://localhost/mongo-traning",{useNewUrlParser: true})
    .then(() => console.log("Connected to MongoDB........"))
    .catch(err => console.error("Couldnot connected to MongoDB...."));

app.use(express.json());

app.get("/products",async (request,response)=>{
    Product.find()
    .then(product => {
        return response.send(product);
    })
    .catch(err=>{
        response.send(err);
    })
})

app.get("/product/:name", async (request,response)=>{
    let name = request.params.name;
    try{
        const product = await Product
        .find({
            name: name.charAt(0).toUpperCase() + name.slice(1)
        });
        return response.send(product);
    }
    catch(err){
        return response.send(err)
    }

});
app.get("/product/:name/:price", async (request,response)=>{
    Product
    .find({name:request.params.name, price:{ $gt: 10, $lt:500}})
    .then(product =>{
        return response.send(product);
    })
    .catch(err=>{
        response.send(err)
    })

})

app.post("/product",async(request,response)=>{

    const {error} = validate(request.body);
    try{
        const product = new Product(request.body);
        if(validate(product)==true){
            const savedProduct = await product.save();
            return response.send(savedProduct);
        }
        else{
            return response.send("invalid........")
        }
    }catch(err){
        return response.send(err);
    }
})


app.listen(3000, () => console.log("listening port 3000....."));
