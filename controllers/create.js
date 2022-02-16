const { mapError } = require("../services/util.js");

module.exports = {
  async get(req, res) {
    res.render("create", { title: "Create" });
  },
  async post(req, res) {
   
console.log(req.session.user.id)
    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: Number(req.body.price),
      owner:req.session.user.id
    };

    try {
      await req.storage.createCar(car);
      console.log(car)
      console.log("New publish created!");
      res.redirect('/');
    }
     catch (err) {
      console.log('Error in creating record');

res.locals.errors = mapError(err)
res.render('create', {title:'Create Listing',car});

    }
  }
};
