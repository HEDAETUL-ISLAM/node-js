// setTimeout(() => {
//     console.log("ascync code .....");
// },2000)
// setTimeout(() => {
//     console.log("ascync2 code .....");
// },2000)
const request = require('request');
const call = function(user){
    console.log(user);
}
console.log("before");
getProjects(1,function(projects){
    //console.log(projects)
    console.log(getDeveloper(projects.develoer_list[0].id,call(user)));
});

function getDeveloper(id,callback){
    request("http://173.82.212.25:8000/maveinfo/api/developers/" +id+"/",
        (err,body)=>{
            if(err) console.log(err);
            else callback(JSON.parse(body));
        }
    )
}

function getProjects(id, callback){
    console.log("getting projects from database..");
    request("http://173.82.212.25:8000/maveinfo/api/projects/" +id+"/",
        (err,response,body) =>{
            if(err) console.log(err);
            else callback(JSON.parse(body));
        }
    )
}

console.log("after");