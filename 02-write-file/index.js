const { stdin, stdout, exit } = process;
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

function theEnd() {
  stdout.write('Goodbye!');
  exit();
}

stdout.write('Hello, please write a text...\n');

stdin.on('data', (data) => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    theEnd();
  }
  writeStream.write(data);
});
