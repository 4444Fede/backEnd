const fs = require("fs");
let chunkCounter = 0;

const readStream = fs.createReadStream("streams/files/bigData.txt", "utf8");

function readFile() {
  readStream.on("data", (chunk) => {
    console.log("Received chunk:", chunk);
    chunkCounter++;
  });

  readStream.on('end', () => {
    console.log(`Finished reading file with ${chunkCounter} chunks.`);
  });
}

readFile()