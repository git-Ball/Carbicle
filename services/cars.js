
const Car = require("../models/Car.js");
const { carViewModel } = require("./util.js");

async function getById(id) {
  const car = await Car.findById(id).where({isDeleted:false}).populate('accessories') //.populate('accessories')
  if (car) {
    return carViewModel(car);
  } else {
    return undefined;
  }
  
}
async function createCar(car) {
  const result = new Car(car);
  await result.save();

}
async function getAll(query) {
  // console.log(query);
  const options = {isDeleted:false};

  if (query.search) {
    options.name = new RegExp(query.search, "i");
  }
  if (query.from) {
    options.price = { $gte: Number(query.from) };
  }
  if (query.to) {
    if (!options.price) {
      options.price = {};
    }
    options.price.$lte = Number(query.to) ;
  }
  // console.log(options);
  // {name: new RegExp(query.search,'i')}
  const cars = await Car.find(options).where({isDeleted:false}); //.lean()
  //VIEW MODEL!
  // console.log(cars)
  return cars.map(carViewModel);

}
async function deleteById(id, ownerId) {
  // await Car.findByIdAndDelete(id);
  const existing = await Car.findById(id).where({ isDeleted: false });

console.log('owenerID>',ownerId)

  if (existing.owner != ownerId) {
console.log('  F A L S E')

      return false;
  }

  await Car.findByIdAndUpdate(id, { isDeleted: true });
console.log('  T R U E')
  return true;
}



  // if(existing.owner != ownerId){
  //   return false;
  // }
  //  console.log('DELETE RESULT',result)
  //   await Car.findByIdAndUpdate(id,{isDeleted:true});
  //   return true;

async function updateById(id, car,ownerId) {
const existing = await Car.findById(id).where({isDeleted:false});
// const existing = await Car.findById(id).where({isDeleted:false});

if(existing.owner != ownerId){
  return false;
}

  existing.name = car.name
  existing.description = car.description
  existing.imageUrl = car.imageUrl
  existing.price = car.price
  existing.accessories = car.accessories

  await existing.save();
  return true;
}
async function attachAccessory(carId,accessoryId,ownerId){
  const  existing= await Car.findById(carId)
  if(existing.owner != ownerId){
    return false;
  }

  existing.accessories.push(accessoryId)
  await existing.save();
return true;
}

// function carViewModel(car) {
//   return {
//     id: car._id,
//     name: car.name,
//     description: car.description,
//     imageUrl: car.imageUrl,
//     price: car.price,
//     accessories: car.accessories
//   };
// }
module.exports = () => (req, res, next) => {
  req.storage = {
    getAll,
    getById,
    createCar,
    deleteById,
    updateById,
    attachAccessory,
  };
  next();
};
