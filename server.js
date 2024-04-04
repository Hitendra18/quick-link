const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const connectDB = require("./config/db.js");
connectDB();

// Corse
const corsOptions = {
  origin: process.env.ALLOW_CLIENTS.split(","),
};

app.use(cors(corsOptions));

// Template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Middleware function for routs that have "/api/files"
app.use("/api/files", require("./routs/files.js"));
app.use("/files", require("./routs/show.js"));
app.use("/files/download", require("./routs/download.js"));

app.get("/", (req, res) => {
  res.send("index.html");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
