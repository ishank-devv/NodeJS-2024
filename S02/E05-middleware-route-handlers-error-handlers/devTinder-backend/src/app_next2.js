const express = require("express");
const app = express();

//What happens when next() is written before res.send("Response 1");
app.use(
  "/user",
  (req, res, next) => {
    //Route Handler 1
    console.log("Handling the router user 1");
    next();
    res.send("Response 1");
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

// Order of execution:
// console.log("Handling the router user 1");
// next()
// console.log("Handling the router user 2");
// res.send("Response 2");(
// EXECUTION of 2ND ROUTER HANDLER COMPLETES BUT code of excution comes back in 1st route handler AFTER next(), there is still a line waiting to be executed
// res.send("Response 1"); - ERROR: Cannot set headers after they are sent to the client
