const fs = require('fs/promises');
const path = require('path');
fs.rm('04-copy-directory/files-copy', { force: true, recursive: true })
  .then( (err) => { 
    if (err) {
      console.error(err);
    } else {
      copyDir();
    }
  });

function copyDir() {
fs.mkdir('04-copy-directory/files-copy', { recursive: true })
  .then(fs.readdir('04-copy-directory/files', { withFileTypes: true })
    .then(filenames => {
      const results = [];
      for (let filename of filenames) {
        if (!filename.isDirectory()) {
          results.push(filename.name);
        }
      }
      return results;
    })
    .then(results => {
      for (let file of results) {
        fs.copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`)
      }
    }))
  };
