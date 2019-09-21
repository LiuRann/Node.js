#!/usr/bin/node

var base64Str = 'emhhbmdzYW46MTIzNDU2';
var buf = new Buffer(base64Str,'base64');
const info = buf.toString('utf8').split(':');

console.log('用户名: %s 密码: %s', info[0], info[1]);