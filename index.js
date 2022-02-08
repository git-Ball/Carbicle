// [x] login reginster logout user services
// [x] auth contoller with login register,logout
// [] add owner property to Car,accessory models
// [] protect routes
// [] add auth checks to  data modifications

const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
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
const accessoryService = require("./services/accessory.js");
const authService = require("./services/auth.js");
const {
  loginGet,
  loginPost,
  registerGet,
  registerPost,
  logout,
} = require("./controllers/auth.js");
const attach = require("./controllers/attach.js");
const del = require("./controllers/delete.js");
const edit = require("./controllers/edit.js");
const { isLoggedIn } = require("./services/util.js");

start();
async function start() {
  await initDb();
  const app = express();
  const port = 3000;
  const handlebars = hbs.create({ extname: ".hbs" });

  app.engine(".hbs", handlebars.engine);
  app.set("view engine", ".hbs");

  app.use(
    session({
      secret: "my syper duper secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );
  //   app.use(express.urlencoded({extended: true}))
  app.use("/static", express.static("static"));
  //   app.use(await storage());

  app.use(carServices());
  app.use(accessoryService());

  app.use(authService());
  app.use(express.urlencoded({ extended: false }));

  app.get("/", home);
  app.get("/about", about);

  app.get("/create", isLoggedIn(), create.get);
  app.post("/create", isLoggedIn(), create.post);

  app.get("/details/:id", details);

  app.get("/delete/:id", isLoggedIn(), del.get);
  app.post("/delete/:id", isLoggedIn(), del.post);

  app.get("/edit/:id", isLoggedIn(), edit.get);
  app.post("/edit/:id", isLoggedIn(), edit.post);

  app.get("/accessory", isLoggedIn(), accessory.get);
  app.post("/accessory", isLoggedIn(), accessory.post);

  app.get("/attach/:id", isLoggedIn(), attach.get);
  app.post("/attach/:id", isLoggedIn(), attach.post);

  app.get("/login", loginGet);
  app.post("/login", loginPost);

  app.route("/register").get(registerGet).post(registerPost);

  app.get("/logout", logout);

  app.all("*", notFound);

  app.listen(port, () =>
    console.log(` -----> Server is live at ${port} <----- `)
  );
}
