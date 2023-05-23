const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Andrii:o7rBFVEDfwILwd24@cluster0.rszr7o5.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001);
  })
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
