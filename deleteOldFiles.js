const connectDB = require("./config/db");
const File = require("./models/file");
const fs = require("fs");

connectDB();

// Get all records older than 24 hours
async function fetchData() {
  const files = await File.find({
    createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    // createdAt: { $lt: new Date(Date.now() - 1000) },
  });
  if (files.length) {
    for (const file of files) {
      try {
        await fs.promises.unlink(file.path);
        await File.findOneAndDelete({ _id: file._id });
        console.log(`Successfully deleted ${file.filename}`);
      } catch (err) {
        console.error(`Error while deleting file ${file.filename}: ${err}`);
      }
    }
  }
  console.log("Job done!");
}

fetchData().then(process.exit);
