module.exports = {
  async get(req, res) {
    res.render("create", { title: "Create" });
  },
  async post(req, res) {
   

    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: Number(req.body.price),
    };

    try {
      await req.storage.createCar(car);
      console.log("New publish created!");
      res.redirect('/');
    }
     catch (err) {
      res.redirect('/create');

      console.log('Error in creating record');
    }
  }
};
