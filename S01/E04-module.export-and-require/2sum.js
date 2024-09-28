//Modules protects their variables and fucntions from leaking by default
//solution:
//you have to explicitely export function and variables in order to use
//them in another module

console.log("Sum Module Executed");

var x = "hello sum";

function calculateSum(a, b) {
  const sum = a + b;
  console.log(sum);
}

// with explicit export
module.exports = calculateSum;
