require("./1xyz.js"); // first this code runs then the code below

require("./1sum.js");

var name = "Namaste NodeJS";
var a = 10;
var b = 20;

console.log(name);
console.log(a + b);

calculateSum(4, 3); // ReferenceError: calculateSum is not defined

console.log(globalThis === global); // true
