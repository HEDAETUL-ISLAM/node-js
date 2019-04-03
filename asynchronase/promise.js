const request = require("request");

function getProjects(id){
    return new Promise((resolve,reject) => {
        console.log("getting projects...");
        request("http://173.82.212.25:8000/maveinfo/api/projects/" +id+"/",
            (err,response,body) =>{
                if(err) reject (err);
                else resolve(JSON.parse(body));
            }
        )
    })
}
function getDeveloper(id){
    return new Promise((resolve,reject) => {
        console.log("getting projects...");
        request("http://173.82.212.25:8000/maveinfo/api/developers/" +id+"/",
            (err,response,body) =>{
                if(err) reject (err);
                else resolve(JSON.parse(body));
            }
        )
    })
}

// getProjects(1)
// .then(project => getDeveloper(project.developer_list[0].id))
// .then(developer => console.log(developer))
// .catch(err => console.log(err));

async function writeDevelopers(){
    const project = await getProjects(1);
    const developer = await getDeveloper(project.developer_list[0].id);
    console.log(project);
    console.log(developer);
}
writeDevelopers();
