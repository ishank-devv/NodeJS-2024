// require("./path")
// All the code of the module is wrapped inside a function(IIFE)

//IIFE - Immediately invoked Function Expression
// Immediately invokes the code
// Privacy- keep var and fucntion safe

// (function () {
//   // All the code of the module( called using require)
//   // runs inside this function
//   //when we call require
//   // function calculateMultiply(a, b) {
//   //   const result = a * b;
//   //   console.log(result);
//   // }
//   // module.exports = { calculateMultiply };
// })();

console.log(__filename);
console.log(__dirname);
