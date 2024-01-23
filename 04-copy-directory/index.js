const fs = require('fs');
const path = require('path');

// проверка на наличие папки и ее создание
fs.readdir(path.join(__dirname), (err, files) => {
  if (err) {
    return console.log(err);
  }
  if (files.includes('files-copy') === false) {
    fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }
});

function copyFiles(el) {
  const filePath = `./files/${el}`;
  const filePathCopy = `./files-copy/${el}`;

  fs.copyFile(filePath, filePathCopy, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Files copy successfully!');
  });
}

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach((el) => {
    copyFiles(el);
  });
});
