const fs = require('fs');
const path = require('path');

const appendFilePath = path.join(__dirname, 'files/data.txt');
const textToAppend = '\nAppended text';

function appendToFile() {
    fs.appendFile(appendFilePath, textToAppend, (err) => {
        if (err) {
            console.error('Failed to append text:', err);
            return;
        }
        console.log('Data appended successfully');
    });
}

appendToFile();
