const express = require("express");

// Creating new instance of expressJS application
const app = express();

//GENERIC REQUESTS HANDLER- when user hits on server using http://localhost:3000 or http://localhost:3000/hello or http://localhost:3000/test
app.use((req, res) => {
  res.send("Hello from the server!");
});

// This starts the server and tells it to listen for incoming requests on port 3000. By default, it listens on localhost.
// cb function is called once my server is up and running
app.listen(3000, () => {
  console.log("Server is seccuessfully listening on port 3000...");
});
