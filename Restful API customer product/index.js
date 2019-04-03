const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
app.use(bodyParser.json());




app.get("/persons", (request, response) => {
    fs.readFile("./persons.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            return response.send(result);
        }
    })

})
app.get("/person/:id",(request,response)=>{
    fs.readFile("./persons.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            var persons = JSON.parse(result);
            const person=persons.find(e=>e.id==request.params.id);
            return response.send(person);
        }
    })
});

app.delete("/person/delete/:id",(request,response)=>{
    fs.readFile("./persons.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            var persons = JSON.parse(result);
            const person=persons.find(e=>e.id==request.params.id);
            // fs.writeFile("./persons.txt",JSON.delete(person),
            // err => console.log(err))
            return response.send(person);
        }

    })
});

app.post("/persons", (request, response) => {
    var persons=[];
    fs.readFile("./persons.txt",{encoding:"utf-8"},(err,result)=>{
        if(err){
            console.log(err);
            throw new Error();
        }
        else{
            persons=result ? JSON.parse(result):[];
            persons.push(request.body);
            console.log(persons);
            fs.writeFile("./persons.txt",JSON.stringify(persons),
            err => console.log(err))
        }
    })
    return response.send(request.body);
})

function isvalid(person){
    if(typeof(person.id) == "number" ){
        return true;
    }else{
        return false;
    }
}
app.put("/person/:id",(request,response)=>{

    let person = request.body;

    if(isvalid(person) == true){
        fs.readFile("./persons.txt",{encoding:"utf-8"},(err,result)=>{
            if(err){
                console.log(err);
                throw new Error();
            }
            else{
                var persons = JSON.parse(result);
                person = persons.find(e=>e.id==request.params.id);
                console.log(person);
                if(person){
                    persons = persons.map(p=>{
                        if(p.id == request.params.id){
                            p = request.body;
                        }
                        return p;
                    })
                    fs.writeFile("./persons.txt", JSON.stringify(persons),
                    err => console.log(err));
                    return response.send(request.body);
                }
            }
        })
    }
    else if(isvalid(person) == false){
        console.log("errore ...............")
    }

})

app.listen(8000,()=>console.log("listening on port 8000....."));
