const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach((el) => {
    let filePath = path.join(dirPath, el);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return console.log(err);
      }
      if (!stats.isDirectory()) {
        const name = path.basename(filePath).split('.').slice(0, -1).join('.');
        const extName = path.extname(filePath).split('.').slice(1).join('.');
        const size = stats.size;
        console.log(`${name} - ${extName} - ${size}`);
      }
    });
  });
});
