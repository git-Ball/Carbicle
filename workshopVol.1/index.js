const express = require('express');
const hbs =require('express-handlebars');
const {init: storage} = require('./models/storage')
// const bodyparser =require('body-parser').urlencoded({
//     extended:true
// });


const { about } = require('./controllers/about.js');
const { catalog } = require('./controllers/catalog.js');
const { create, post } = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const { notFound } = require('./controllers/notFound.js');


start();
async function start(){
    const app = express();
    const port = 3000;
    const handlebars =hbs.create({extname: '.hbs',})
    
    app.engine('.hbs',handlebars.engine)
    app.set('view engine','.hbs');
    app.use('/static', express.static('static'));
    app.use(await storage());
    app.use(express.urlencoded({extended:false}))
    
    app.get('/',catalog)
    app.get('/about',about);
    app.get('/create',create);
    app.post('/create',post);
    app.get('/details/:id',details)
    
    app.all('*',notFound)
    
    app.listen(port,()=>console.log(` -----> Server is live at ${port} <----- `));
}