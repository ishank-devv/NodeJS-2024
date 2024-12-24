const express = require("express");
const app = express();

// Both are Route Handler
// Middleware- helps navigates express to the correct /user route
// Response Handlers - actually send response back

// Middleware1
app.use("/", (req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.get(
  "/user",
  // Middleware 2
  (req, res, next) => {
    console.log("Middleware 2");
    next();
  },
  // Response handler 1
  (req, res, next) => {
    console.log("Log Response Handler 1");
    res.send("Response handler 1");
  },
  // Response handler 2- won't even execute because response has already been sent
  (req, res, next) => {
    console.log("Log Response Handler 2");
    res.send("Response handler 2");
  }
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
