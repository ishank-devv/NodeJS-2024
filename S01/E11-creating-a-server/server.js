// const http = require("http");
// same thing - signifies nodejs core module
const http = require("node:http");

// creating an instance of a server
const server = http.createServer(
  //handle logic
  function (req, res) {
    // reply to user with Hello World
    res.end("Hello World!");
  }
);

server.listen(7777);

// User types
// http://localhost:7777/
// OUPUT
// Hello World!
