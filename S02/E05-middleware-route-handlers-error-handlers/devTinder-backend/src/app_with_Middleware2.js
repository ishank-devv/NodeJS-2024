const express = require("express");
const app = express();

//Why do we need middlewares/actual use of it-
//With Middleware

//MIDDLEWARE- handling the authorisation part
// will be called for all the /admin routes
app.use("/admin", (req, res, next) => {
  // Logic of checking if the request is authorised
  console.log("Admin auth is getting checked!!");
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

//admin auth is not getting checked as route is /user- can be used where authorisation is not required like public pages
app.get("/user", (req, res) => {
  res.send("User Data sent");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
