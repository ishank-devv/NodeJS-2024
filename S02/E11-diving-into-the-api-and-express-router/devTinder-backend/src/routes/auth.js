const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const { validateLogin } = require("../utils/validatorLogin");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//works same as app.get()
authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    // login details entered by user
    const { emailId, password } = req.body;

    //validate Login data(utils)
    validateLogin(req);

    //checking if user is present in DB or not
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email id is not present in DB");
    }

    // If user is present then comparing (myPlaintextPassword(getting while user is login), passwordhash(saved in db))
    // Making helper function inside user.js file using user schema methods & offloading it there
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.comparePassword(password);

    if (isPasswordValid) {
      //If pass is valid, Create a JWT token
      // Hiding ({payload}, secretkey,{expiry}) inside jwt with default (HMAC SHA256) ALGO
      // Making helper function inside user.js file using user schema methods & offloading it there
      //   const token = jwt.sign({ _id: user._id }, "Dev@node@321", {
      //     expiresIn: "7d",
      //   });
      //user here is Akash or Elon
      const token = await user.getJWT();
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

authRouter.post("/logout", async (req, res) => {
  try {
    // res.cookie(token, replacing-with-null);
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout Successful!");
  } catch (err) {
    res.status(400).send("Error logging out the user:" + err.message);
  }
});

module.exports = authRouter;
