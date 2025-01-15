// Everything in Mongoose starts with a Schema.
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

const mongoose = require("mongoose");

// Legit field present inside the user collection
// creating schema for user
const userSchema = new mongoose.Schema(
  {
    // if firstName(required) is not there then mongoose will not allow the insertion of document/row in the collection/table
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    age: {
      type: Number,
      min: 18,
      max: 110,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      // CUSTOM VALIDATION ON SCHEMA:
      // this validate funct will be only called by default when new document/row is being inserted(ie signup) ,
      // not while doing patch/update the document/row
      // to enable this validate while patch/update you need to do runValidators: true, in options of User.findByIdAndUpdate
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error(
            "Gender data is not valid! It could be male, female ,  other"
          );
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      trim: true,
    },
    about: {
      type: String,
      default: "This is a default about of the user",
      trim: true,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

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
