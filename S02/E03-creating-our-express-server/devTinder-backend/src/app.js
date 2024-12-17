const express = require("express");

// Creating new instance of expressJS application
const app = express();

//1.Specific REQUESTS HANDLER- when user hits on server using http://localhost:3000/dashboard
app.use("/dashboard", (req, res) => {
  res.send("Dashboard is up");
});

//2.Specific REQUESTS HANDLER- when user hits on server using http://localhost:3000/hello
app.use("/hello", (req, res) => {
  res.send("Hello is up");
});
//3.Specific REQUESTS HANDLER- when user hits on server using http://localhost:3000/hello
app.use("/test", (req, res) => {
  res.send("Test is up");
});

// This starts the server and tells it to listen for incoming requests on port 3000. By default, it listens on localhost.
// cb function is called once my server is up and running
app.listen(3000, () => {
  console.log("Server is seccuessfully listening on port 3000...");
});

// Note: scripts in package.json
// npm run dev: when development is happening, we need to restart the app at every change in code
// npm run start: runs once, donot restart at every change. IDEAL FOR PRODUCTION
