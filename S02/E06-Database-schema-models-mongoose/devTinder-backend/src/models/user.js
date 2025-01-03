// Everything in Mongoose starts with a Schema.
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

const mongoose = require("mongoose");

// Legit field present inside the user collection
// creating schema for user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

// creating a model for user
// (nameofmodel, schema)
const User = mongoose.model("User", userSchema);
module.exports = User;
// or
// module.exports = mongoose.model("User", userSchema);

// NOTE:
// Schema defines this Model, means "schema" defines the structure and data types of documents within a collection

// whenever you create a mongoDb DB,
// you create some collection(table) inside it,
// that collection will hold data,
// Assume that MOdel is like user Class,
// we'll create small new instances of class/model
// whenever a new user will come in, it will be new instance of class/model
// suppose a user akshay comes in, it is of type User, it will go into User collection
