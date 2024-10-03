console.log("Sum Module Executed");

export var x = "hello sum";

//wont work in ESM but will work in CJSff
//ReferenceError: z is not defined - RUNNING IN STRICT MODE
z = "Hello World";

//new way to export when type is module
// ESM or mjs
export function calculateSum(a, b) {
  const sum = a + b;
  console.log(sum);
}

//create obj to
// with explicit export
//multiple items
// module.exports = { x: x, calculateSum: calculateSum };
//OR
// module.exports = { x, calculateSum };
