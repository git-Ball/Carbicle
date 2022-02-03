const fs = require('fs').promises;
const uniqId = require('uniqid')
//load and parse data file
// [ ] provide ability to
// [ ] -read all entries
// [ ]- read single entry by ID
// [ ] -add new entry
// [ ] * get matcjong entries by search criteria

let data ={};


async function init(){
    try{
        data = JSON.parse(await fs.readFile('./models/data.json'))
}
catch(err){
    console.error('Error reading database')
}
    return (req,res,next) =>{
       req.storage={
           getAll,
           getById,
           create
       };
       next();
    }
}

// {
//     "sdffgsdfgsdfg":{
//         "name":"string",
//         "description":"string",
//         "imgUrl":"string",
//         "difficulty":"number"
//     }
// }

async function getAll(query){
let cubes =Object
.entries(data)
.map(([id,value])=>Object.assign({},{id},value));

///filter cubes
if(query.search){
    cubes= cubes.filter(c=>c.name.toLowerCase().includes(query.search.toLowerCase()));
}
if(query.from){
    cubes =cubes.filter(c=>c.difficultyLevel>=Number(query.from));
}
if(query.to){
    cubes = cubes.filter(c=> c.difficultyLevel<=Number(query.to));
}
    return cubes;
}

async function getById(id){
    return data[id];
}

async function create(cube){
    let id = uniqId();
data[id] = cube;
try{
    await fs.writeFile('./models/data.json', JSON.stringify(data,null,2))
    console.log('----Created new record----')
}
catch(err){
    console.error('Error writing out of database')
}

// cube = {
//         id:{
//             "name":"string",
//             "description":"string",
//             "imgUrl":"string",
//             "difficulty":"number"
//         }
// }
}
module.exports ={
    init,
    getAll,
    getById,
    create 
}