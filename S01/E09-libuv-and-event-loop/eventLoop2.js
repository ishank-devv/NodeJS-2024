const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImmediate"));

//*priority-2
Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");
});

setTimeout(() => console.log("Timer expired"), 0);

//*priority-1
process.nextTick(() => console.log("process.nextTick"));

function printA() {
  console.log("a=", a);
}

printA();
console.log("Last line of the file");

//console
// a = 100
// Last line of the file

//--Blue phase/cycle--priority--
// process.nextTick
// Promise

// -----1ST ITERATION OF EVENT LOOP PHASES- TIMER,POLL,CHECK,CLOSE ---
// Timer expired
// setImmediate (--file reading operation takes time,cb schdule will happen in next iteration---)

// -----When Event loop is Idle-  Event loop is waiting at Pole phase and whole fs function is pushed in call stack and ran it like synchronous code & every asynchrous thing offloads to libuv to process again which are further schduled to execute on call stack
// File Reading CB
