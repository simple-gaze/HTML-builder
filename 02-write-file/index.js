const fs = require('fs');
const path = require('path');
const { stdout } = process;
const readline = require('node:readline');

const writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
let rl = readline.createInterface(
  process.stdin, process.stdout);

rl.setPrompt(`Введите текст\n`);
rl.prompt();
rl.on('line', (text) => {
  if (text === 'exit') {
    rl.close();
  } else {
    writeableStream.write(`${text}\n`);
  }
});
process.on('exit', () => stdout.write('Успехов в изучении Node.js!'));

