const fs = require("fs");
const path = require("path");

const fileToDelete = path.join(__dirname, "files/data.txt");

function deleteFile() {
  fs.unlink(fileToDelete, (err) => {
    if (err) {
      console.error("Could not delete file:", err);
      return;
    }
    console.log("File deleted successfully");
  });
}

deleteFile();
