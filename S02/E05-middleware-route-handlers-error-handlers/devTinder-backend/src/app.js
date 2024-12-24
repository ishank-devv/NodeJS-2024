const express = require("express");
const app = express();

// ADDING MULTIPLE FUNCTIONS
// All will give the same response - working is same
// app.use("/route", rh1,rh2,rh3,rh4,rh5)
// app.use("/route", [rh1,rh2,rh3,rh4,rh5])
// app.use("/route", [rh1,rh2],rh3,rh4,rh5)
app.use(
  "/user",
  [
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
  ],
  (req, res, next) => {
    //Route Handler 3
    console.log("Handling the router user 3");
    next();
  },
  (req, res, next) => {
    //Route Handler 4
    console.log("Handling the router user 4");
    next();
  },
  (req, res, next) => {
    //Route Handler 5
    console.log("Handling the router user 5");
    res.send("Route Handler 5");
  }
);

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});

// output: in postman
// THERE IS NO WRROR BUT IT WILL HANG
// because we're not handling in either of route handlers with a proper response back
//( RESPONSE SHOULD BE SENT TO AVOID THIS)
