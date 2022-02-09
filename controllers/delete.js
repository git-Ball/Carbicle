module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const car = await req.storage.getById(id);

    if(car.owner != req.session.user.id){
      console.log(' User is not owner to delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      return res.redirect('/login')
    }


    if (car) {
      res.render("delete", { title: `Delete Listing - ${car.name}`, car });
    } else {
      res.redirect("404");


    }
  },
  async post(req, res) {
    const id = req.params.id;
    console.log('asddd')
    // console.log('------- ID>>', id)
    // console.log("Confirmided deletion", req.params.id);
    // res.redirect('/')

    try{

      console.log('check')
       if(await req.storage.deleteById(id,req.session.user.id)){
        console.log("Confirmided deletion", req.params.id);

        res.redirect('/');
       }
       else{
         res.redirect('/login')
       }


    }
    catch(err){
      console.log(err)
      console.log(err.message)
    res.redirect('/login')

      console.log('Attempted to delete not-existed id',(id))
    }
  },
};
