const express = require("express");
const app = express();

// Corner Case 1: what will happen if you remove response from 4th handler as well and replace it with next()
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
    next();
  },
  (req, res, next) => {
    //Route Handler 3
    console.log("Handling the router user 3");
    next();
  },
  (req, res, next) => {
    //Route Handler 4
    console.log("Handling the router user 4");
    // res.send("Response 4");
    next();
  }
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});

// output: in postman, express feels there must be other route handler also
// Cannot GET /user
