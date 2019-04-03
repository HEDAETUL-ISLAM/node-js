const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
app.use(bodyParser.json());


app.get("/products", (request,response)=>{
    fs.readFile("./products.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            return response.send(result);
        }
    })
})
app.get("/product/:id",(request,response)=>{
    fs.readFile("./products.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            var products = JSON.parse(result);
            const product=products.find(e=>e.id==request.params.id);
            return response.send(product);
        }
    })
});

app.post("/products", (request, response) => {
    var products=[];
    fs.readFile("./products.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            products=result ? JSON.parse(result):[];
            products.push(request.body);
            console.log(products);
            fs.writeFile("./products.txt",JSON.stringify(products),
            err => console.log(err))
        }
    })
    return response.send(request.body);
})

function isvalid(product){
    if(typeof(product.id) == "number" ){
        return true;
    }else{
        return false;
    }
}
app.put("/product/:id",(request,response)=>{

    let product = request.body;

    if(isvalid(product) == true){
        fs.readFile("./products.txt",{encoding:"utf-8"},(err,result)=>{
            if(err){
                console.log(err);
                throw new Error();
            }
            else{
                var products = JSON.parse(result);
                product = products.find(e=>e.id==request.params.id);
                console.log(product);
                if(product){
                    products = products.map(p=>{
                        if(p.id == request.params.id){
                            p = request.body;
                        }
                        return p;
                    })
                    fs.writeFile("./products.txt", JSON.stringify(products),
                    err => console.log(err));
                    return response.send(request.body);
                }
            }
        })
    }
    else if(isvalid(product) == false){
        console.log("errore ...............")
    }

})

app.listen(8000,()=> console.log("listening port 8000..."));