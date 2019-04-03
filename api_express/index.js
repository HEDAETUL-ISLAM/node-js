const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const persons =[
    {id: 1, name: "hedaet"},
    {id: 2, name: "bulbul"},
    {id: 3, name: "islam"},
]

app.get("/persons", (request, response) => {
    return response.send(persons);
})
app.get("/persons/:id", (request, response) => {
    const person = persons.find(e=> e.id == request)
})
app.post("/persons", (request, response) => {
    persons.push(JSON.parse(req.body));
    return res.send(JSON.parse(req.body));
})

app.listen(3000,()=> console.log("listening port 3000..."));