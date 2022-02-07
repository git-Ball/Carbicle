module.exports = {
  async get(req, res) {
    const id = req.params.id;

    try {
      const [car, accessories] = await Promise.all([
        req.storage.getById(id),
        req.accessory.getAll(),
      ]);
const existingIds = car.accessories.map(a=>a.id.toString())
      const availableAccessories = accessories.filter(a=> existingIds.includes(a.id.toString()) == false);
      console.log(car);
      // console.log(accessories)
      res.render("attach", { title: "Attach Accessory", car, accessories:availableAccessories });
    } catch (err) {
      // console.log(err)
      res.redirect("404");
    }
  },
  async post(req, res) {
    console.log(req.body, req.params.id);
    try {
      const carId = req.params.id;
      const accessoryId = req.body.accessory;

      await req.storage.attachAccessory(carId, accessoryId);
      res.redirect("/");
    } catch (err) {
      console.log("Error creating accesory");
      console.log("Error creating accesory");
      res.redirect("/attach/" + carId);
    }
  },
};
