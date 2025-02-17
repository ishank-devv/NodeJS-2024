const express = require("express");

// Creating new instance of expressJS application
const app = express();

//1.Specific REQUESTS HANDLER- when user hits on server using http://localhost:4000/dashboard
app.use("/dashboard", (req, res) => {
  res.send("Dashboard is up");
});

//2.Specific REQUESTS HANDLER- when user hits on server using http://localhost:4000/hello
app.use("/hello", (req, res) => {
  res.send("Hello is up");
});

//3.Specific REQUESTS HANDLER- when user hits on server using http://localhost:4000/test
app.use("/test", (req, res) => {
  res.send("Test is up");
});

app.use("/data", (req, res) => {
  // res.send("Hello is up");
  res.send([
    { id: 1, name: "John", age: 30, car: null },
    { id: 2, name: "Alice", age: 25, car: "Tesla" },
    { id: 3, name: "Bob", age: 40, car: "BMW" },
    { id: 4, name: "Emma", age: 35, car: null },
    { id: 5, name: "Michael", age: 28, car: "Audi" },
  ]);
});

// This starts the server and tells it to listen for incoming requests on port 3000. By default, it listens on localhost.
// cb function is called once my server is up and running
app.listen(4000, () => {
  console.log("Server is seccuessfully listening on port 4000...");
});

// Note: scripts in package.json
// npm run dev: when development is happening, we need to restart the app at every change in code
// npm run start: runs once, donot restart at every change. IDEAL FOR PRODUCTION
