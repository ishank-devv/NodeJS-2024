// ERROR HANDLING 2

const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  try {
    // Logic of DB call and get user data
    throw new Error("dvbzhjf");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//ERROR HANDLING here ( if you don't use try catch block above- if you didnt use try catch)
// err should be the first parameter- order matters a lot
// app.use("/", (err, req, res, next) => {
//   if (err) {
//   }
// });

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
