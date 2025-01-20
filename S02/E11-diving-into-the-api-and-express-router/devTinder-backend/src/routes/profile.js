const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

// Get the user info  who has logged in, current JWT stored in cookies
// if JWT of Akash is present in cookie, then data of only Akash will be displayed.
// if JWT of Elon is present in cookie, then data of only Elon will be displayed.
profileRouter.get("/profile", userAuth, async (req, res) => {
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

module.exports = profileRouter;
