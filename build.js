const fs = require('fs');
const path = require('path');

const distDirectory = path.join(__dirname, 'dist');
const sourceFile = path.join(__dirname, 'index.js');
const destinationFile = path.join(distDirectory, 'index.js');

if (!fs.existsSync(distDirectory)) {
  fs.mkdirSync(distDirectory, { recursive: true });
}

fs.copyFileSync(sourceFile, destinationFile);

console.log('Build completado correctamente');