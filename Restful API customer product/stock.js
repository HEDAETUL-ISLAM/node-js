const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
app.use(bodyParser.json());


app.get("/stocks", (request, response) => {
    fs.readFile("./stocks.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            return response.send(result);
        }
    })

})
app.get("/stock/:stock_id",(request,response)=>{
    fs.readFile("./stocks.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            var stocks = JSON.parse(result);
            const stock=stocks.find(e=>e.stock_id==request.params.stock_id);
            return response.send(stock);
        }
    })
});
app.post("/stocks", (request, response) => {
    var stocks=[];
    fs.readFile("./stocks.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            stocks=result ? JSON.parse(result):[];
            stocks.push(request.body);
            console.log(stocks);
            fs.writeFile("./stocks.txt",JSON.stringify(stocks),
            err => console.log(err))
        }
    })
    return response.send(request.body);
})

function isvalid(stock){
    if(typeof(stock.stock_id) == "number" ){
        return true;
    }else{
        return false;
    }
}
app.put("/stock/:stock_id",(request,response)=>{

    let stock = request.body;

    if(isvalid(stock) == true){
        fs.readFile("./stocks.txt",{encoding:"utf-8"},(err,result)=>{
            if(err){
                console.log(err);
                throw new Error();
            }
            else{
                var stocks = JSON.parse(result);
                stock = stocks.find(e=>e.stock_id==request.params.stock_id);
                console.log(stock);
                if(stock){
                    stocks = stocks.map(p=>{
                        if(p.stock_id == request.params.stock_id){
                            p = request.body;
                        }
                        return p;
                    })
                    fs.writeFile("./stocks.txt", JSON.stringify(stocks),
                    err => console.log(err));
                    return response.send(request.body);
                }
            }
        })
    }
    else if(isvalid(stock) == false){
        console.log("errore ...............")
    }

})

app.listen(8000,()=>console.log("listening on port 8000....."));