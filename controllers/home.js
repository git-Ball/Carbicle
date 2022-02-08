module.exports ={
    async  home(req,res){
      console.log(res.locals)

        let query = req.query;
      const cars =  await req.storage.getAll(query); //req.query
     
    //   const ctx ={
    //       title: Cubicle,
    //       cars
    //   };
      res.render('index',{cars,title:'Carbicle'})
    }
}