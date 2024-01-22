const { stdin, stdout, exit } = process;
const fs = require('fs');
const writeStream = fs.createWriteStream('text.txt');

function theEnd() {
  stdout.write('Goodbye!');
  exit();
}

stdout.write('Hello, please write a text...\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    theEnd();
  }
  console.log(data.toString().trim());
  writeStream.write(data);
});
