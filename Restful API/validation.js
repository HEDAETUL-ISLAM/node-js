const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
app.use(bodyParser.json());


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

app.listen(3000,()=> console.log("listening port 3000..."));