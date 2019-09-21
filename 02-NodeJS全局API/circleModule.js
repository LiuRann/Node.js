#!/usr/bin/node

global.pi = Math.PI;
//实验5
global.circleFun = (r) => {
  function circumference() {
    return pi * 2 * r;
  }

  function area() {
    return pi * r * r;
  }

  return {
    area: area,
    circumference: circumference
  };
};
//实验6
global.objCircle = {
  circumference : (r) => pi * 2 * r,
  area : (r) => pi * r * r
};
