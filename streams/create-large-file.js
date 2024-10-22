const fs = require("fs");
const writeStream = fs.createWriteStream("streams/files/bigData.txt");

function createFile(){
    const lines = 500000;
    for (let i = 1; i < lines + 1; i++) {
      writeStream.write(`escritura ${i}.\n`);
    }

    writeStream.on('error', (err) => {
        console.error('Error writing file', err);
    })

    writeStream.end(() => {
        console.log(`File created with ${lines} lines.`);
    });
}

createFile();
