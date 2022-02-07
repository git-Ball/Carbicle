const User= require('../models/User.js')


// testUpdate()

// async function testUpdate(){
//     const user = await User.findOne({})
//     user.hashedPassword ='000'
//     await user.save()
//     console.log('-------------------<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>',user)
// }

async function register(username,password){
    const user = new User({
        username,
        hashedPassword: password
    });
  
    await user.save();
}



module.exports =() =>(req,res,next) =>{
    req.auth ={
        register
    };

    next();
}