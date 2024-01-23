const fs = require('fs');
const path = require('path');

const pathDirProject = path.join(__dirname, '/project-dist');
const pathCopyDirAssets = path.join(__dirname, '/project-dist/assets');
const pathDirAssets = path.join(__dirname, '/assets');
const pathDirStyles = path.join(__dirname, '/styles');
const pathNewFileStyles = path.join(pathCopyDirAssets, '/styles.css');
const pathTemplate = path.join(__dirname, 'template.html');
const pathTemplProj = path.join(pathDirProject, '/index.html');
const pathComponents = path.join(__dirname, '/components');

const createDir = (route) => {
  fs.mkdir(route, { recursive: true }, (err) => {
    if (err) {
      return console.log(err);
    }
  });
};

createDir(pathDirProject);
createDir(pathCopyDirAssets);

// const filePath = path.join(pathDirAssets, el);
// const filePathCopy = path.join(pathCopyDirAssets, el);

function copyFiles(el, dirPath) {
  const filePath = `${pathDirAssets}/${dirPath}/${el}`;
  const filePathCopy = `${pathCopyDirAssets}/${dirPath}/${el}`;

  fs.copyFile(filePath, filePathCopy, (err) => {
    if (err) {
      return console.log(err);
    }
  });
}

const copyFileDir = (dirPath) => {
  const arr = dirPath.split('\\');
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((el) => {
      copyFiles(el, arr[8]);
    });
  });
};

function copyDir(dirPath, copyDirPath) {
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return console.log(err);
    }
    files.forEach((el) => {
      if (!el.isFile()) {
        createDir(path.join(copyDirPath, el.name));
        copyFileDir(path.join(dirPath, el.name));
      } else {
        fs.copyFile(
          path.join(dirPath, el.name),
          path.join(copyDirPath, el.name),
        );
      }
    });
  });
}

const mergeStyles = () => {
  fs.readdir(pathDirStyles, 'utf-8', (err, files) => {
    if (err) {
      return console.log(err);
    }

    fs.writeFile(pathNewFileStyles, '', (err) => {
      if (err) {
        return console.log(err);
      }
    });

    files.forEach((el) => {
      if (path.parse(path.join(pathDirStyles, el)).ext === '.css') {
        let stream = fs.createReadStream(path.join(pathDirStyles, el));

        stream.on('data', (data) => {
          fs.appendFile(pathNewFileStyles, data, (err) => {
            if (err) {
              return console.log(err);
            }
          });
        });
      }
    });
  });
};

function rewriteTemplate() {
  let templ = fs.createReadStream(pathTemplate, 'UTF-8');

  templ.on('data', (el) => {
    let newTempl = fs.createWriteStream(pathTemplProj, 'UTF-8');
    fs.readdir(pathComponents, { withFileTypes: true }, (err, files) => {
      if (err) {
        return console.log(err);
      }
      let resHTML = el;

      files.forEach((file, i) => {
        i += 1;
        const filePath = path.join(pathComponents, file.name);

        if (file.isFile() && path.extname(file.name) === '.html') {
          const readerHtml = fs.createReadStream(filePath, 'UTF-8');
          const ext = path.extname(file.name);
          const tag = path.basename(file.name, ext);
          const templTag = `{{${tag}}}`;

          readerHtml.on('data', (el) => {
            resHTML = resHTML.replace(templTag, el);

            if (i === files.length) {
              newTempl.write(resHTML);
            }
          });
        }
      });
    });
  });
}

copyDir(pathDirAssets, pathCopyDirAssets);
mergeStyles();
rewriteTemplate();
