const fs = require("fs");
const https = require("https");

console.log("Hello World");

var a = 1078698;
var b = 20986;

//Synchronous Function - will block the main thread( don't have callback)
//( v8 will offloads this task to libUv but it will not behave Asynchronous )
//file system is getting the data in synchronous fashion
// fs.readFileSync("./file.txt", "utf8"); // for example- 100ms
// console.log("This will execute only after file read");

https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetched Data Successfully from Api ");
});

setTimeout(() => {
  console.log("setTimeout called after 5 seconds");
}, 5000);

//Async Function - will not block the main thread
//( v8 offloads this task to libUv)
fs.readFile("./file.txt", "utf8", (err, data) => {
  console.log("File Data :", data);
});

function multiplyFn(x, y) {
  const result = a * b;
  return result;
}

var c = multiplyFn(a, b);
console.log("Multiplication result:", c);

// Hello World
// Multiplication result: 22637556228
// File Data : This is the file data
// Fetched Data Successfully from Api
// setTimeout called after 5 seconds
