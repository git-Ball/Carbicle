const mongoose = require('mongoose');

require('./Car')
const connectionString = 'mongodb://localhost:27017/carbicle';
                              //localhost:27017/
async function init() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB Connected!!!!!!!');
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