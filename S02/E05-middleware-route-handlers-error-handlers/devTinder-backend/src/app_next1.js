const express = require("express");
const app = express();

//can Handle any type of route method, GET, POST, DELETE
app.use(
  "/user",
  (req, res, next) => {
    //Route Handler 1
    console.log("Handling the router user 1");
    // NOTE 1: If you dont't send response back( res.send("Response 1"); is commented ), then postman/browser will get into infinite loop & timeout
    // res.send("Response 1");
    //NOTE2: to make it work use next();, it will pass the expressjs to move to Router Handler 2, and will find a response 2 there
    next(); // given to us by expressJS

    //NOTE3:
    // If both are uncommented next(); & res.send("Response 1"), then it will met will error when parsing the res.send("Response 2");
    // Order of Execution:
    // Handling the router user 1
    // res.send("Response 1");
    // Handling the router user 2
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    // Because you've already sent the response to client ie. res.send("Response 1") over http://localhost:3000/user request & TCP connection is closed now
  },
  (req, res) => {
    //Route Handler 2
    console.log("Handling the router user 2");
    res.send("Response 2");
  }
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
