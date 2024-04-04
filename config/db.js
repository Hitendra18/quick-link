const mongoose = require("mongoose");

function connectDB() {
  // DataBase Connection
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
  });
  const connection = mongoose.connection;

  connection
    .once("open", () => {
      console.log("DataBase Connected.");
    })
    .on("error", (err) => {
      console.log("Error in Database connection");
    });
}

module.exports = connectDB;
