const mongoose = require("mongoose");
require("dotenv").config();

// const dbURI = process.env.DB_URI;
// const dbPort = process.env.DB_PORT;
const url = `${process.env.LOCAL_URL}`;

try {
  mongoose.connect(url);
  console.log("MongoDb corriendo");
} catch (error) {
  console.error();
}
