#!/usr/bin/node
console.log('file name:', __filename);
console.log('dir name:', __dirname);

//1
var fileName = __dirname + '/views/view.html';

//2

switch(process.platform) {
  case 'linux':
    fileName = __dirname + '/views/view.html';
    break;

  case 'win32':
    fileName = __dirname + '\\views\\view.html';
    break;

  default:
    fileName = 'something wrong';
}
console.log('fileName:', fileName);

//3
const path = require('path');
fileName = path.join(__dirname, 'views', 'views.html');
console.log('fileName:', fileName);