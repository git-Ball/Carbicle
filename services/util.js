const bcrypt = require('bcrypt');

function carViewModel(car) {
    const model = {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories
      };
      if(model.accessories.length > 0 && model.accessories[0].name){

console.log('****');
model.accessories = model.accessories.map(accessoryViewModel);

      }
   
    return model;
  }

  function accessoryViewModel(accessory) {
    return {
      id: accessory._id,
      name: accessory.name,
      description: accessory.description,
      imageUrl: accessory.imageUrl,
      price: accessory.price,
    };

  }
async function hashPassword(password){
  console.log('------------------------------------------BEFORE HASH PW',password)
  const result = await bcrypt.hash(password,10);
//   const salt = await bcrypt.genSalt(saltRounds);
// const hash = await bcrypt.hash(myPlaintextPassword, salt);
  console.log('Hashed PASSWORD CREATED ------------->>>>>>>>>',result)
  return result;
}

async function comparePassword(password,hashedPassword){
  
return await bcrypt.compare(password,hashedPassword)
}
  module.exports={
      accessoryViewModel,
      carViewModel,
      hashPassword,
      comparePassword
  };