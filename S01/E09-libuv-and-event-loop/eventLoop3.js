// Event loop waits at poll phase
// Step 1- Schduling of callbacks
// step 2- execution of callbacks
const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

//*priority-2-Blue-cycle
Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("2nd timer"), 0);

  process.nextTick(() => console.log("2nd process.nextTick"));

  setImmediate(() => console.log("2nd setIntermediate"));

  console.log("File Reading CB");
});

//*priority-1-blue-cycle
process.nextTick(() => console.log("process.nextTick"));

console.log("Last line of the file");

//console:

// Last line of the file

//--Blue phase/cycle--priority--During 1st iteration
// process.nextTick
// Promise
// -----1ST ITERATION OF EVENT LOOP PHASES- TIMER,POLL,CHECK,CLOSE ---
// Timer expired
// setImmediate (--file reading operation takes time,cb schdule will happen in next iteration---)

//----When Event loop is Idle-  Event loop is waiting at Pole phase and whole fs function is pushed in call stack and ran it like synchronous code & every asynchrous thing offloads to libuv to process again which are further schduled to execute on call stack
// File Reading CB
// --Blue phase/cycle--priority--
// 2nd process.nextTick
// ----- Event loop will continue from poll phase to check phase
// 2nd setImmediate

// 2nd Timer
