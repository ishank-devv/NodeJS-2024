const fs = require("fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");
});

// Highest Priority- nextTick callback queue
// If there is nested nextTick, then all nested nextTicks will be executed first means
// First it will excuted nextTick queues first
process.nextTick(() => {
  process.nextTick(() => console.log("  Inner nextTick"));
  console.log("nextTick");
});

console.log("Last line of the file.");

//CONSOLE
//
// Last line of the file

// nextTick
// Inner nextTick

// Promise
// Timer Expired
// setImmediate
// File Reading CB
//
//
