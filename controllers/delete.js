module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const car = await req.storage.getById(id);
    console.log('get DEL',car)
    if (car) {
      res.render("delete", { title: `Delete Listing - ${car.name}`, car });
    } else {
      res.redirect("404");


    }
  },
  async post(req, res) {
    const id= req.params.id;
    // console.log('------- ID>>', id)
    // console.log("Confirmided deletion", req.params.id);
    // res.redirect('/')
    try{
        await req.storage.deleteById(id)
    console.log("Confirmided deletion", req.params.id);

        res.redirect('/');

    }
    catch(err){
      console.log('Attempted to delete not-existed id',(id))
    res.redirect('404')
    }
  },
};
