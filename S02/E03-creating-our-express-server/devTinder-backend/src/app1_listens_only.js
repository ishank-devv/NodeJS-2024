//WITHOUT REQUEST HANDLER BUT LISTENER IS PRESENT, THATS ENOUGHT
// TO CREATE SERVER BUT NOT HANDLE INCOMING REQUEST

const express = require("express");

// Creating new instance of expressJS application
const app = express();

// This starts the server and tells it to listen for incoming requests on port 3000. By default, it listens on localhost.
// cb function is called once my server is up and running
app.listen(3000, () => {
  console.log("Server is seccuessfully listening on port 3000...");
});
