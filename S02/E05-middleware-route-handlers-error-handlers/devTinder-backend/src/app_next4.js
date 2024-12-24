const express = require("express");
const app = express();

// calling all 4 route handlers in console
app.use(
  "/user",
  (req, res, next) => {
    //Route Handler 1
    console.log("Handling the router user 1");
    next();
  },
  (req, res, next) => {
    //Route Handler 2
    console.log("Handling the router user 2");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    //Route Handler 3
    console.log("Handling the router user 3");
    // res.send("Response 3");
    next();
  },
  (req, res) => {
    //Route Handler 4
    console.log("Handling the router user 4");
    res.send("Response 4");
  }
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
