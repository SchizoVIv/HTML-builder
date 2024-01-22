const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) throw err;
  files.forEach((el) => {
    let filePath = `secret-folder/${el}`;
    fs.stat(filePath, (err, stats) => {
      if (err) throw err;
      if (!stats.isDirectory()) {
        const name = path.basename(filePath).split('.').slice(0, -1).join('.');
        const extName = path.extname(filePath).split('.').slice(1).join('.');
        const size = stats.size;
        console.log(`${name} - ${extName} - ${size}`);
      }
    });
  });
});
