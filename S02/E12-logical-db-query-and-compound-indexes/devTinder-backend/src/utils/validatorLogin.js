const validator = require("validator");

//Only email can be validate, password will get compared with DB
const validateLogin = (req) => {
  const { emailId } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  }
};

module.exports = {
  validateLogin,
};
