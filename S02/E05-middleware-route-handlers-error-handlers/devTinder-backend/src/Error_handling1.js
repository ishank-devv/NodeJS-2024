const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  //testing error handling
  throw new Error("not a random errorr");

  // Logic of DB call and get user data
  res.send("User Data sent");
});

//ERROR HANDLING here ( if you don't use try catch block above- if you didnt use try catch)
// err should be the first parameter- order matters a lot
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
