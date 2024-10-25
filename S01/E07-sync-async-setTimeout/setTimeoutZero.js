console.log("hello World");

var a = 1078698;
var b = 20986;

// setTimeout with 0 ms delay has trust issue
//it will run after 0 ms when the callstack of main thread is empty
setTimeout(() => {
  console.log("Call me right now ASAP");
}, 0);

setTimeout(() => {
  console.log("Call me after 3 seconds");
}, 3000);

function multiplyFn(x, y) {
  const result = a * b;
  return result;
}

var c = multiplyFn(a, b);
console.log("Multlipication result is : ", c);
