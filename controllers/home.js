module.exports ={
    async  home(req,res){
        console.log(req.query)
        let query = req.query;
      const cars =  await req.storage.getAll(query); //req.query

      console.log('v home',cars);
    //   const ctx ={
    //       title: Cubicle,
    //       cars
    //   };
      res.render('index',{cars,title:'Carbicle'})
    }
}