const mongoose = require("mongoose");
// const DB_NAME = process.env.DB_NAME || "bicihack";
// const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost/${DB_NAME}`;
const DB_NAME = process.env.DB_NAME || '';
const MONGO_URI = process.env.MONGO_URI || '';

// Mongoose configuration
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to ${DB_NAME} database.`);
  })
  .catch(error => {
    console.error(`Database connection error: ${error}`);
  });