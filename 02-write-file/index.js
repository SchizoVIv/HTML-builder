const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

function theEnd() {
  rl.write('Goodbye!');
  rl.pause();
  process.exit();
}

rl.write('Please, write a text...\n');

function writeText() {
  rl.on('line', (answer) => {
    if(answer.toLowerCase() === 'exit'){
      return theEnd();
    }
    writeStream.write(answer);
  });
};

writeText();

rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? \n y(yes) to exit or else to continue \n ', (answer) => {
    if (answer.match(/^y(es)?$/i)) { 
      return theEnd();
    } else {
      writeText();
    }
  });
});
