const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const { validateEditPasswordData } = require("../utils/validation");
const bcrypt = require("bcrypt");

// Get the user info  who has logged in, current JWT stored in cookies
// if JWT of Akash is present in cookie, then data of only Akash will be displayed.
// if JWT of Elon is present in cookie, then data of only Elon will be displayed.
profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid profile Edit request!!");
    }
    const loggedInUser = req.user;
    // console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log(loggedInUser);
    await loggedInUser.save();

    // res.send(`${loggedInUser.firstName}, your profile updated successfully`);
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error Editing the profile: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validateEditPasswordData) {
      throw new Error("Invalid password edit request");
    }
    const loggedInUser = req.user;
    if (loggedInUser.password === req.body.password) {
      throw new Error(
        "Operation failed! this is your current password, try different!"
      );
    }

    // console.log(loggedInUser.password);
    const passwordhash = await bcrypt.hash(req.body.password, 10);
    loggedInUser.password = passwordhash;
    // console.log(loggedInUser.password);

    await loggedInUser.save();

    res.send(`${loggedInUser.firstName}, your Password changed successfully!`);
  } catch (err) {
    res.status(400).send("Error changing the password: " + err.message);
  }
});

module.exports = profileRouter;
