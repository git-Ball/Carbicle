module.exports = {
 async details(req, res)  {
    // const cube = await req.storage.getById(req.params.id);
    const id = req.params.id;
    const car = await req.storage.getById(id)
    console.log('Details >   >',car)
    if (car == undefined) {
      res.redirect('/404');
    } else {
        // const ctx ={
        //     title:'Carbicle',
        //     car
        // }
      res.render("details", {title:`Carbicle - ${car.name}`,car});
    }
  }
};
