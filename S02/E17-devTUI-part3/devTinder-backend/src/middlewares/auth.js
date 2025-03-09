const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from req cookies
    const { token } = req.cookies;
    if (!token) {
      // throw new Error("Token is not valid/available");
      //UnAuthorised: Token is not valid/available
      return res.status(401).send("Please Login!");
    }

    // Validate/verify the token
    const decodedObj = await jwt.verify(token, "Dev@node@321");

    // Find the user
    const { _id } = decodedObj;
    const user = await User.findById({ _id: _id });
    if (!user) {
      throw new Error("User not found");
    }
    // Attaching user onto the req so that i can be used in request handler
    // console.log("Before " + req.user);
    req.user = user;
    // console.log("After " + req.user);

    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

// const adminAuth = (req, res, next) => {
//   // Logic of checking if the request is authorised
//   console.log("Admin auth is getting checked!!");
//   const token = "xyz";
//   const isAdminAuthorised = token === "xyz";
//   if (!isAdminAuthorised) {
//     res.status(401).send("Unauthorized admin request");
//   } else {
//     next();
//   }
// };

// const userAuth = (req, res, next) => {
//   // Logic of checking if the request is authorised
//   console.log("User auth is getting checked!!");
//   const token = "xyzz";
//   const isAdminAuthorised = token === "xyz";
//   if (!isAdminAuthorised) {
//     res.status(401).send("Unauthorized user request");
//   } else {
//     next();
//   }
// };

module.exports = {
  // adminAuth,
  userAuth,
};
