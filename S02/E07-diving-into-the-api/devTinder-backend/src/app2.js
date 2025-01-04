// Middleware to read JSON & convert it into JS object
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Middleware to read JSON & convert it into JS object & adds this JS obj back to req in the body( ie req.body )
// will work for all the routes
app.use(express.json());

app.post("/signup", async (req, res) => {
  // req- big Object where JSON data is a part of it
  //   console.log(req);

  // Undefined- because our server is unable to read JSON data
  // need a middleware which can read JSON & convert it into JS object which is readable by server/node - app.use(express.json())
  // Now it won't show undefined
  console.log(req.body);
});

connectDB()
  .then(() => {
    console.log("Database cluster & DB connection established...");
    //moving app.listen here
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log("Database cluster cannot be connected!!!");
  });

// NOTE: PROPER WAY OF MAKING A DB CONNECTION
// once your DB connection is established
// then only you should do app.listen( 3000, ()=>{})

// that's why first export connectDB function from database.db file
// and import it in app.js( line 2 ) & call connectDB before app.listen
