//importing
// when explicit export was used
// on multiple items
// destructuring
const { x, calculateSum } = require("./4sum.js");

// var x = "100";//Error
calculateSum(4, 3); // No Error
console.log(x); // No Error
