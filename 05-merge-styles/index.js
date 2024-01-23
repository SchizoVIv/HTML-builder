let fs = require('fs');
let path = require('path');
let pathNewFile = path.join(__dirname, 'project-dist', 'bundle.css');
let styles = path.join(__dirname, 'styles');

fs.readdir(styles, 'utf-8', (err, files) => {
  if (err) {
    return console.log(err);
  }

  fs.writeFile(pathNewFile, '', (err) => {
    if (err) {
      return console.log(err);
    }
  });

  files.forEach((el) => {
    if (path.parse(path.join(styles, el)).ext === '.css') {
      let stream = fs.createReadStream(path.join(styles, el));

      stream.on('data', (data) => {
        fs.appendFile(pathNewFile, data, (err) => {
          if (err) {
            return console.log(err);
          }
        });
      });
    }
  });
});
