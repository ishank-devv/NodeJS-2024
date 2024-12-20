const express = require("express");
const app = express();

// REQUEST HANDLERS: ORDER OF ROUTES matters as code runs from top to bottom

// http://localhost/hello/2 will trigger this
//And anything that matches after /hello/2/ , this will take that url up eg: /hello/2/testttt
app.use("/hello/2", (req, res) => {
  res.send("Hello2 is up");
});

// http://localhost/hello will trigger this
//And anything that matches after /hello/ , this will take that url up eg: /hello/xyz
app.use("/hello", (req, res) => {
  res.send("Hello is up");
});

app.use("/test", (req, res) => {
  res.send("Test is up");
});

//WILDCARD
//postion / in the end only- order is imp
//anything that matches after / , this will take that url up
app.use("/", (req, res) => {
  res.send("Home is up");
});

// This starts the server and tells it to listen for incoming requests on port 3000. By default, it listens on localhost.
// cb function is called once my server is up and running
app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
