const fs = require('fs/promises');
const path = require('path');
const { stdout } = process;

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true })
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
      fs.stat(`03-files-in-folder/secret-folder/${file}`)
      .then(stats => console.log(file.split('.').join(' - ') + ' - ' + stats.size))
    }
  })


