const express = require("express");
const app = express();

// ORDER MATTERS- dont write app.use on top as it will be excuted first in place of GET POST & DELETE
// can handle any type of method GET,POST,DELETE etc
// app.use("/user", (req, res) => {
//   res.send("HAHAHAHA");
// });

// Handling GET & POST call seperately
// app.get- will match only GET requests
// app.use- will match all HTTPS requests( including GET & POST )

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstname: "Varun", lastname: "Mehta" });
});

// This will only handle POST call to /user
app.post("/user", (req, res) => {
  //assume saving data to db happened
  res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Successfully");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
