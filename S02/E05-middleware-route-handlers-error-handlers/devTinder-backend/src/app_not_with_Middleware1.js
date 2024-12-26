const express = require("express");
const app = express();

//Why do we need middlewares/actual use of it- middleware are being repitative in this example

//without Middleware

app.get("/admin/getAllData", (req, res) => {
  // Logic of checking if the request is authorised
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (isAdminAuthorised) {
    // by default it sends 200 status
    res.send("ALl Data sent");
  } else {
    res.status(401).send("Unauthorized request");
  }
});

app.get("/admin/deleteUser", (req, res) => {
  // Logic of checking if the request is authorised
  const token = "xyzzz";
  const isAdminAuthorised = token === "xyz";
  if (isAdminAuthorised) {
    // by default it sends 200 status
    res.send("Deleted a user");
  } else {
    res.status(401).send("Unauthorized delete request");
  }
});

// NOTE: we're writing logic of token & authorisation again and again which
// is not a good way that's why we need middleware

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
