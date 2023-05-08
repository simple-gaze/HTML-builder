const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');
fsPromises.rm(path.join(__dirname, 'project-dist', 'bundle.css'), { force: true, recursive: true })
.then( (err) => { 
  if (err) {
    console.error(err);
  } else {
    mergeStyles();
  }
})

function mergeStyles() {
  fsPromises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
    .then(filenames => {
      const styles = [];
      for (let filename of filenames) {
        if (!filename.isDirectory() && path.extname(`05-merge-styles/styles/${filename.name}`) === '.css') {
          styles.push(filename.name);
        }
      }
      return styles;
    })
    .then(styles => {
      let bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
      for (let filename of styles) {
        let readableStream = fs.createReadStream(path.join(__dirname, 'styles', `${filename}`), 'utf-8');
        readableStream.pipe(bundle);
      }
    })
  };