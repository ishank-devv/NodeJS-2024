const express = require("express");
const app = express();

//QUERY PARAMETERS
//req.query  - userid=101 & password=testing
// POSTMAN -http://localhost:3000/user?userid=101&password=testing
app.get("/user", (req, res) => {
  // Acceesing
  console.log(req.query);
  res.send({ firstname: "req.query", lastname: "Mehta" });
});

//ROUTE PARAMETERS
//req.params - : means its a Dynamic route
// POSTMAN -http://localhost:3000/user/707
app.get("/user/:userId", (req, res) => {
  // Acceesing Params here
  console.log(req.params);
  res.send({ firstname: "req.params", lastname: "Mehta" });
});

// POSTMAN - http://localhost:3000/user/707/varun/password
app.get("/user/:userId/:name/:password", (req, res) => {
  // Acceesing Params here
  console.log(req.params);
  res.send({ firstname: "req.params multiple", lastname: "Mehta" });
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
