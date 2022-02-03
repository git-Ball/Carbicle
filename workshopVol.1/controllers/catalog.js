module.exports ={
    catalog: async (req,res)=>{
 
      const cubes = await req.storage.getAll(req.query);
      console.log(cubes)
      const ctx={
        title: 'Cubicle',
        cubes
      };
        res.render('index',ctx)
    }
}