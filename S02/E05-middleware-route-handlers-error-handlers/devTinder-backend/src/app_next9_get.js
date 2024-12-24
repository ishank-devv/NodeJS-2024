const express = require("express");
const app = express();

// INDEPENDET app.get + next()
// 2nd route handler won't be called because there is no next() present in 1st route handler

app.get("/user", (req, res, next) => {
  //Route Handler 1
  console.log("Handling the router user 1");
  res.send("Route Handler 1");
});

app.get("/user", (req, res, next) => {
  //Route Handler 3
  console.log("Handling the router user 2");
  next();
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});

// Order of execution:
// console.log("Handling the router user 1");
// res.send("Route Handler 1");
