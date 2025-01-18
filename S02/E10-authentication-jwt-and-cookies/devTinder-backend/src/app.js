// Creating GET api - feed api( get all users from the database)
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { validateLogin } = require("./utils/validatorLogin");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

// Middleware to read JSON & convert it into JS object & adds this JS obj back to req in the body( ie req.body )
// will work for all the routes
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    // Validation of data(utils)
    validateSignUpData(req);

    //Encrypting the passwords
    // password, salt,         saltRounds
    // Akash@123,jnds%$^&#hgdf, 10
    const passwordhash = await bcrypt.hash(password, 10);
    // console.log(passwordhash);
    //$2b$10$gvLqToD3W7Etg72ZkMq2YuxA.zdjDjyIj19G4LhABkqv6JkIvMT1m

    // First, we'll have to create new instance of User model & pass the data which you recevied from api( POST)
    // Bad way of creating an instance, what if user is sending random data like xyz etc
    // const user = new User(req.body);
    // Better way, only accept what you've mentioned here, this will be save to DB
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordhash,
    });

    // this will save data in users collection on DB, this funct returns you a promise( most mongoose functions does)
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //validate Login data(utils)
    validateLogin(req);

    //checking if user is present in DB or not
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email id is not present in DB");
    }

    // If user is present then comparing (myPlaintextPassword(getting while user is login), passwordhash(saved in db))
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //If pass is valid, Create a JWT token
      // Hiding ({payload}, secretkey,{expiry}) inside jwt with default (HMAC SHA256) ALGO
      const token = jwt.sign({ _id: user._id }, "Dev@node@321", {
        expiresIn: "7d",
      });
      // console.log(token);

      //Add the token to cookie & send the response back to user(user is already authenticated if this is happening)
      //Manually adding token to the cookie
      // res.cookie("token", "hgabshjwttoken");
      // Adding JWT token to the cookie
      res.cookie("token", token, {
        // coockie will expire in 7 * 24 = 7 days
        expires: new Date(Date.now() + 7 * 24 * 3600000),
        httpOnly: true,
      });
      res.send("Login Successful! ");
    } else {
      throw new Error("Password is not correct!");
    }
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// Get the user info  who has logged in, current JWT stored in cookies
// if JWT of Akash is present in cookie, then data of only Akash will be displayed.
// if JWT of Elon is present in cookie, then data of only Elon will be displayed.
app.get("/profile", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;
    // const { token } = cookies;
    // if (!token) {
    //   throw new Error(
    //     "Invalid Token/token not present inside cookie, login again!"
    //   );
    // }

    // //validation of token( if token is fake or if it has expired or not)
    // const decodedMessage = await jwt.verify(token, "Dev@node@321");
    // const { _id } = decodedMessage;
    // // console.log("Logged in user is: " + _id);

    // console.log(cookies);
    // undefined when cookie-parse is not used
    // { token: 'hgabshjwttoken' } when cookie-parse is used
    // [Object: null prototype] {} when cookie/JWT is removed

    // // res.send("Reading Cookie");
    // const user = await User.findById({ _id: _id });
    // if (!user) {
    //   throw new Error("User does not exist");
    // }

    // As in userAuth, we have attached user in the request already
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error accessing the cookie:" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // sending a connection request
  console.log("Sending a connection request");
  res.send(user.firstName + " sent the connection request!");
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
