const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach((el) => {
    let filePath = path.join(dirPath, el);
    const name = path.parse((filePath)).name;
    console.log(el);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return console.log(err);
      }
      if (!stats.isDirectory()) {
        const extName = path.extname(filePath).replace('.', '');
        const size = stats.size;
        console.log(`${name} - ${extName} - ${size}`);
      }
    });
  });
});
