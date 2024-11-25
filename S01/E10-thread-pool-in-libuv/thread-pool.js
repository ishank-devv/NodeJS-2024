// In nodeJs size of thread pool -> 4 by default
// UV_THREADPOOL_SIZE = 4

const fs = require("fs");
const crypto = require("crypto");

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("1- cryptoPBKDF2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("2- cryptoPBKDF2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("3- cryptoPBKDF2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("4- cryptoPBKDF2 done");
});

// 5th one will wait untill the 1st 4 crpto call execution completes
// 5th crpto call is waiting for a thread to be empty
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("5- cryptoPBKDF2 done");
});
