const fs = require('fs');
const path = require('path');

const pathDir = path.join(__dirname, 'files');
let pathDirCopy = path.join(__dirname, 'files-copy');

function copyFiles(el) {
  console.log('copy');
  const filePath = path.join(pathDir, el);
  const filePathCopy = path.join(pathDirCopy, el);

  fs.copyFile(filePath, filePathCopy, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(filePathCopy);
    console.log('Files copy successfully!');
  });
}

fs.rm(pathDirCopy, { recursive:true, force: true  }, (err) => {

  if (err) {
      return console.log(err);
    };
    console.log(pathDirCopy);
    console.log("удалено")
    fs.mkdir(pathDirCopy, (err) => {
      if (err) {
        return console.log(err);
      }
    });

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  console.log(files);
  if (err) {
    return console.log(err);
  }
  files.forEach((el) => {
    copyFiles(el);
  });
});
})
