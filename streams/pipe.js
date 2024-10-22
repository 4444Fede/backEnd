const fs = require("fs");

const readStream = fs.createReadStream("streams/files/bigData.txt");
/*
const readStream = fs.createReadStream('streams/files/largeFile.txt'); // || PARA PROBAR EL ERROR FILE ||
*/
const writeStream = fs.createWriteStream("streams/files/copyFile.txt");

function copyFile() {
  readStream.on("error", (err) => {
    generateErrorFile(`Error reading file: ${err.message}`);
    return;
  });

  writeStream.on("error", (err) => {
    generateErrorFile(`Error writing file: ${err.message}`);
    return;
  });

  readStream.pipe(writeStream);
  console.log("File copied successfully.");
}

function generateErrorFile(errorMessage) {
  const errorWriteStream = fs.createWriteStream("streams/files/errorFile.txt");

  errorWriteStream.write(`An error occurred: ${errorMessage}\n`, (err) => {
    if (err) {
      console.error("Error writing to error file:", err);
      return;
    }
  });

  errorWriteStream.on("error", (err) => {
    console.error("Error writing error file:", err);
  });

  errorWriteStream.end(() => {
    console.log("Error file created.");
  });
}

copyFile();
