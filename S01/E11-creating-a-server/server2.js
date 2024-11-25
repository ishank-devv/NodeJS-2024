const http = require("node:http");

const server = http.createServer(
  //handle logic
  function (req, res) {
    if (req.url === "/getSecretData") {
      res.end("There is no secret data");
    }
    res.end("Hello World!");
  }
);

server.listen(7777);

// USER END-1
// http://localhost:7777/
// OUPUT
// Hello World!

// USER END-2
// http://localhost:7777/getSecretData
// OUPUT
// There is no secret data
