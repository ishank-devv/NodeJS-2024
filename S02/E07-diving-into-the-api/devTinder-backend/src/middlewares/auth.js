const adminAuth = (req, res, next) => {
  // Logic of checking if the request is authorised
  console.log("Admin auth is getting checked!!");
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("Unauthorized admin request");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  // Logic of checking if the request is authorised
  console.log("User auth is getting checked!!");
  const token = "xyzz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("Unauthorized user request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
