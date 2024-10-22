const fs = require('fs');
const path = require('path');

const readFilePath = path.join(__dirname, 'files/data2.txt');
const logFilePath = path.join(__dirname, 'files/logError.txt');

function createLog() {
    fs.readFile(readFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Could not read file:', err);
            fs.writeFile(logFilePath, `Error: ${err.message}\n`, (err) => {
                if (err) {
                    console.error('Failed to write log file:', err);
                    return;
                }
                console.log('Error logged successfully');
            });
            return;
        }
        console.log(data);
    });
}

createLog();
