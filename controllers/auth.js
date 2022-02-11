const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const router = Router();
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});
router.post(
  "/register",
  body("username").trim(),
  body("password").trim(),
  body("repeatPassword").trim(),
  body("username").isLength({ min: 5 }).withMessage('Username must be at least 5 characters long!')
  .isAlphanumeric().withMessage('Username may contain only alphanumeric!'),
  body("password").isLength({ min: 8 }).withMessage('Password must be at least 5 characters long!')
  .isAlphanumeric().withMessage('Password may contain only alphanumeric!'),
  body("repeatPassword").custom(
    (value, { req}) => value == req.body.password)
    .withMessage('Password dont match!'),
  async (req, res) => {
    // if(req.body.username =='' || req.body.password == ''){
    //   return res.redirect('/register')
    // }
    // if(req.body.password != req.body.repeatPassword){
    //   return res.redirect('/register')

    // }
    const {errors} = validationResult(req);

    try {
      if(errors.length >0){
        throw errors;
      }
      await req.auth.register(req.body.username, req.body.password);
      console.log("SUCCESFULL REGISTER >> > > >", req.body);
      res.redirect("/");
    } catch (err) {
       res.locals.errors = err;
      console.error(err.message);
      console.log(err);
res.render('register',{title: 'Register',data:{username:req.body.username}});
    }
  }
);
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});
router.post("/login", async (req, res) => {
  try {
    await req.auth.login(req.body.username, req.body.password);
    console.log("SUCCESFULL Login >> > > >", req.body);
    res.redirect("/");
  } catch (err) {
    // res.redirect("/login");
    console.error(err.message);
    res.locals.errors = [{msg:err.message}]
    res.render('login',{title:'Login'})
  }

  console.log(req.body);
});
router.get("/logout", (req, res) => {
  req.auth.logout();
  res.redirect("/");
});

module.exports = router;
// module.exports ={
//     registerGet (req,res){
//      res.render('register',{title:'Register'})
//    },
//    async registerPost (req,res){
// if(req.body.username =='' || req.body.password == ''){
//   return res.redirect('/register')
// }
// if(req.body.password != req.body.repeatPassword){
//   return res.redirect('/register')

// }
//  try{
//   await req.auth.register(req.body.username,req.body.password)
//   console.log('SUCCESFULL REGISTER >> > > >',req.body)
//   res.redirect('/')
//  }
//  catch(err){
//    console.error(err.message)
//    console.log(err)
//   return res.redirect('/register')

//  }

//   },
//     loginGet (req,res){
//     res.render('login',{title:'Login'})

//   },
//    async loginPost (req,res){

//     try{
//       await req.auth.login(req.body.username,req.body.password)
//       console.log('SUCCESFULL Login >> > > >',req.body)
//       res.redirect('/')
//      }
//      catch(err){
//       res.redirect('/login')
//        console.error(err.message)
// }

//     console.log(req.body)

//   },

//   logout(req,res){
//     req.auth.logout()
//     res.redirect('/')
//   }
// }
