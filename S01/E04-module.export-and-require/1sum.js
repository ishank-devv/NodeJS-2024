//Modules protects their variables and fucntions from leaking by default

console.log("Sum Module Executed");

var x = "hello sum";

function calculateSum(a, b) {
  const sum = a + b;
  console.log(sum);
}

// without explicit export
