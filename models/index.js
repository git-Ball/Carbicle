
const mongoose = require('mongoose');

require('./Car')
require('./Accessory.js')
// 127.0.0.1
const connectionString = 'mongodb://127.0.0.1/carbicle';
// const connectionString = 'mongodb://localhost:27017/carbicle';
                              //localhost:27017/
async function init() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex:false
    });
    console.log('DB Connected!!!!!!!');

    // await Car.create({
    //   "name": "Subaru Impreza",
    //   "description": "Over powered beast with twin-turbo.",
    //   "imageUrl": "subImpreza.jpg",
    //   "price": 18200
    // })

    mongoose.connection.on("error", (err) => {
      console.error("Database Error");
      console.error(err);
    });
  } catch (err) {
    console.error("Error Connection to DB");
    console.error(err);
    process.exit(1);
  }
}

module.exports = init;