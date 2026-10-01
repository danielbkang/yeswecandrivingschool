const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const browserDir = path.join(docsDir, 'browser');

if (fs.existsSync(browserDir)) {
  fs.cpSync(browserDir, docsDir, { recursive: true });
  fs.rmSync(browserDir, { recursive: true, force: true });
}

const indexFile = path.join(docsDir, 'index.html');
const notFoundFile = path.join(docsDir, '404.html');

if (fs.existsSync(indexFile)) {
  fs.copyFileSync(indexFile, notFoundFile);
}

const cnameFile = path.join(docsDir, 'CNAME');
if (!fs.existsSync(cnameFile)) {
  fs.writeFileSync(cnameFile, 'yeswecandrivingschool.ca\n');
}

console.log('GitHub Pages docs/ prepared successfully with CNAME and 404.html');
