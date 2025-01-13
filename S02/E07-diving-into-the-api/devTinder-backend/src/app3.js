//SIGNUP API- Dynamically Handling JSON data( without hard coding) - receiving data from postman

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Middleware to read JSON & convert it into JS object & adds this JS obj back to req in the body( ie req.body )
// will work for all the routes
app.use(express.json());

app.post("/signup", async (req, res) => {
  // First, we'll have to create new instance of User model & pass the data which you recevied from api( POST)
  const user = new User(req.body);

  // NOTE: always do DB operation in try catch block
  try {
    // this will save data in users collection on DB, this funct returns you a promise( most mongoose functions does)
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
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
