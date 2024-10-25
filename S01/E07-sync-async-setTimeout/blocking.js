//this means ,nodejs core module( node:crypto)
const crypto = require("node:crypto");
//or
// const crypto = require("crypto");

console.log("Hello world");
var a = 1078698;
var b = 20986;

//pbkdf2- password based key derivative function v2

// Synchronous function( BLOCKING main thread for a moment)- don't have callback because
// it is blocking the main thread so there is no point of callback
crypto.pbkdf2Sync("password123", "salt", 5000000, 50, "sha512");
console.log("First Key is Generated");

//it will run after 0 ms when the callstack of main thread is empty
setTimeout(() => {
  console.log("Call me right now ASAP");
}, 0);

//Async funct(NON BLOCKING)- managed by libuv
// callback registered by libuv and once key is generated,
// it throws callback function to main thread to be executed
crypto.pbkdf2("password123", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("Second Key is generated");
});

function multiplyFn(x, y) {
  const result = a * b;
  return result;
}

var c = multiplyFn(a, b);
console.log("Multlipication result is : ", c);
