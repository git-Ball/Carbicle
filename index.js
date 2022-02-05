const express = require("express");
const hbs = require("express-handlebars");
// const { init: storage } = require("./models/storage");
// const bodyparser =require('body-parser').urlencoded({
//     extended:true
// });
const initDb = require("./models/index.js");

const { about } = require("./controllers/about.js");

const create = require("./controllers/create.js");
const { details } = require("./controllers/details.js");
const { notFound } = require("./controllers/notFound.js");
const { home } = require("./controllers/home.js");

const carServices = require("./services/cars.js");
const accessory = require("./controllers/accessory.js");
const accessoryService = require('./services/accessory.js')
const attach = require('./controllers/attach.js')
const del = require("./controllers/delete.js");
const edit = require("./controllers/edit.js");

start();
async function start() {
  await initDb();
  const app = express();
  const port = 3000;
  const handlebars = hbs.create({ extname: ".hbs" });

  app.engine(".hbs", handlebars.engine);
  app.set("view engine", ".hbs");
  //   app.use(express.urlencoded({extended: true}))
  app.use("/static", express.static("static"));
  //   app.use(await storage());

  app.use(carServices());
  app.use(accessoryService())
  app.use(express.urlencoded({ extended: false }));

  app.get("/", home);
  app.get("/about", about);

  app.get("/create", create.get);
  app.post("/create", create.post);

  app.get("/details/:id", details);

  app.get("/delete/:id", del.get);
  app.post("/delete/:id", del.post);

  app.get("/edit/:id", edit.get);
  app.post("/edit/:id", edit.post);

  app.get("/accessory", accessory.get);
  app.post("/accessory", accessory.post);

  app.get("/attach/:id", attach.get);
  app.post("/attach/:id", attach.post);


  app.all("*", notFound);

  app.listen(port, () =>
    console.log(` -----> Server is live at ${port} <----- `)
  );
}
