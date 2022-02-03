module.exports = {
    async get(req, res) {
      const id = req.params.id;
      const car = await req.storage.getById(id);

      if (car) {
        res.render("edit", { title: `Edit Listing - ${car.name}`, car });
      } else {
        res.redirect("404");
  
  
      }
    },
    async post(req, res) {
      const id= req.params.id;
const car = {
 
    name:req.body.name,
    description:req.body.description,
    imageUrl:req.body.imageUrl,
    price:Number(req.body.price)
}
console.log(car)


      try{
          await req.storage.updateById(id,car)
      console.log("Confirmided Updation", req.params.id);
  
          res.redirect('/');
  
      }
      catch(err){
      res.redirect('404')
      }
    },
  };
  