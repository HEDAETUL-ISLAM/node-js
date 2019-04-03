const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
app.use(bodyParser.json());




app.get("/sales", (request, response) => {
    fs.readFile("./sales.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            return response.send(result);
        }
    })

})
app.get("/sale/:invoice_id",(request,response)=>{
    fs.readFile("./sales.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            var sales = JSON.parse(result);
            const sale=sales.find(e=>e.invoice_id==request.params.invoice_id);
            return response.send(sale);
        }
    })
});
app.post("/sales", (request, response) => {
    var sales=[];
    fs.readFile("./sales.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            sales=result ? JSON.parse(result):[];
            sales.push(request.body);
            console.log(sales);
            fs.writeFile("./sales.txt",JSON.stringify(sales),
            err => console.log(err))
        }
    })
    return response.send(request.body);
})

function isvalid(sale){
    if(typeof(sale.invoice_id) == "number" ){
        return true;
    }else{
        return false;
    }
}
app.put("/sale/:invoice_id",(request,response)=>{
    let sale = request.body;
    if(isvalid(sale) == true){
        fs.readFile("./sales.txt",{encoding:"utf-8"},(err,result)=>{
            if(err){
                console.log(err);
                throw new Error();
            }
            else{
                var sales = JSON.parse(result);
                sale = sales.find(e=>e.invoice_id==request.params.invoice_id);
                console.log(sale);
                if(sale){
                    sales = sales.map(p=>{
                        if(p.invoice_id == request.params.invoice_id){
                            p = request.body;
                        }
                        return p;
                    })
                    fs.writeFile("./sales.txt", JSON.stringify(sales),
                    err => console.log(err));
                    return response.send(request.body);
                }
            }
        })
    }
    else if(isvalid(sale) == false){
        console.log("errore ...............")
    }

})

app.listen(8000,()=>console.log("listening on port 8000....."));
