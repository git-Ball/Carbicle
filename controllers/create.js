module.exports = {
  async get(req, res) {
    res.render("create", { title: "Create" });
  },
  async post(req, res) {
    console.log("v zaqvkata", req.body);

    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: Number(req.body.price),
    };
    console.log(car);

    req.storage.createCar(car);
    console.log("New publish created!");
    res.redirect('/');
  },
};
