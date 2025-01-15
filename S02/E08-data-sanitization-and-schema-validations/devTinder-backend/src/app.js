// Creating GET api - feed api( get all users from the database)
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
  try {
    // this will save data in users collection on DB, this funct returns you a promise( most mongoose functions does)
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// GET all users/one user with this email id -
// INPUT
// http://localhost:3000/user
//{
// "emailId": "aakash@gupta.com"
//}
// OUTPUT:
//[
//     {
//         "_id": "677814c7fb995334c18c4276",
//         "firstName": "Aakash",
//         "lastName": "Gupta",
//         "emailId": "aakash@gupta.com",
//         "password": "aakash@123",
//         "__v": 0
//     }
// ]
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // users - array of users with the particular emailId ( could be one or two )
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// what if there were 2 users with the same email id, and we only get one( the oldest document)
app.get("/oneUser", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // users - array of users with the particular emailId ( could be one or two )
    const oneUser = await User.findOne({ emailId: userEmail });
    if (!oneUser) {
      res.status(404).send("User not found!");
    } else {
      res.send(oneUser);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Creating GET api - feed api( get all users from the database)- ie. get all documents/rows
app.get("/feed", async (req, res) => {
  try {
    // empty filter will get you all the documents
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// findById- returns the data matching the id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found!");
    }
  } catch {
    res.status(400).send("Something went wrong");
  }
});

// findByIdAndDelete( user Delete in postman ) - delete a user from the DB
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.send("User deleted sucessfully");
    } else {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//update data of the user by id- user patch in postman
// findByIdAndUpdate(id, ...) is equivalent to & using bts findOneAndUpdate({ _id: id }, ...)
// NOTE1: findOneAndUpdate({ _id: id }, ...) can also use emaildId to search for the user
// NOTE2: userId field inside the data should create a new field in our scema but it won't happen because
// it(userId or skills) is not present in schema so it won't be added to database
// any other date which is not part of your schema will be ignored by apis
app.patch("/user/:userId", async (req, res) => {
  // const userId = req.body.userId;
  const userId = req.params?.userId;
  const data = req.body;
  //   {
  //     "userId": "678799519ad8b4f9bea930df",
  //     "emailId": "deepika@gmail.com",
  //     "gender":"female",
  //     "skills": ["javascript","drama","acting"],
  //     "xyz": "skhshsnrandom"

  // }
  try {
    //DATA SANITIZATION - API level validations
    // If user is sending random things like "xyz" in data, then update won't be  allowed.
    const ALLOWED_UPDATE = ["photoUrl", "about", "skills", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    //Logic
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      // if this is true, then only validate() inside gender of user.js will run
      runValidators: true,
    });
    console.log(user);
    if (user) {
      res.send("User updated sucessfully");
    } else {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    res.status(400).send("UPDATE FAILED:" + error.message);
  }
});

// findOneAndUpdate- update by email
app.patch("/userEmail", async (req, res) => {
  const email = req.body.emailId;
  const data = req.body;
  try {
    const user = await User.findOneAndUpdate({ emailId: email }, data, {
      returnDocument: "after",
    });
    console.log(user);
    if (user) {
      res.send("User updated sucessfully");
    } else {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
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
