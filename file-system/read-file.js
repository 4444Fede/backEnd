const fs = require('fs');
const path = require('path');

const readFilePath = path.join(__dirname, 'files/data.txt');

function readFile() {
    fs.readFile(readFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Could not read file:', err);
            return;
        }
        console.log(data);
    });
}

readFile();
