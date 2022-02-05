module.exports = {
  get(req, res) {
    res.render("createAccessory", { title: "Create Accessory" });
  },
  async post(req, res) {
    const accessory = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl || undefined,
      price: req.body.price,
    };
    console.log(req.accessory)
    console.log(accessory)
    try {
      await req.accessory.createAccessory(accessory);
      console.log(accessory);
      console.log("New Accessory Created!");
      res.redirect("/");
    } catch (err) {
        res.redirect("/accessory");
        console.log("Error while creating accessory!");
    }

  },
};
