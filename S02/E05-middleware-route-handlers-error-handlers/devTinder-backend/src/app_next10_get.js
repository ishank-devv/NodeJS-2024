const express = require("express");
const app = express();

// INDEPENDET app.get + next()

app.get("/user", (req, res, next) => {
  //Route Handler 1
  console.log("Handling the router user 1");
  next();
});

app.get("/user", (req, res, next) => {
  //Route Handler 3
  console.log("Handling the router user 2");
  //   res.send("Route Handler 2");
  next();
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});

// Order of execution:
// console.log("Handling the router user 1");
// next()
// console.log("Handling the router user 2");
// next() Cannot GET /user