const express = require("express");
const app = express();

// INDEPENDET app.get + next()

app.get("/user", (req, res, next) => {
  //Route Handler 1
  console.log("Handling the router user 1");
  next();
});

app.get("/user", (req, res) => {
  //Route Handler 3
  console.log("Handling the router user 2");
  res.send("Route Handler 2");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});

//IT WILL WORK THE SAME as previous
// Order of execution:
// console.log("Handling the router user 1");
// next()
// console.log("Handling the router user 2");
// res.send("Route Handler 2");
