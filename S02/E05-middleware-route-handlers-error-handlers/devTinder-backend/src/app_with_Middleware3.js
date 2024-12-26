const express = require("express");
const app = express();

// Handle Auth Middleware ( moved middleware in another seperate file)
const { adminAuth, userAuth } = require("./middlewares/auth");
app.use("/admin", adminAuth);
// app.use("/user", userAuth);

// As we have only one route for /user in the file ,
// so we can write Middleware(userAuth) like this
app.get("/user", userAuth, (req, res) => {
  res.send("User Data sent");
});

// public api- no need to userAuth
app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
