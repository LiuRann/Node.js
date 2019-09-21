#!/usr/bin/node



const log = console.log;

require('./circleModule.js');


log('pi:', pi);

log('area:', circleFun(3).area());
log('circumference:', circleFun(3).circumference());

log('area:', objCircle.area(3));
log('circumference:', objCircle.circumference(3));