const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //refrence to users collection/table
      required: true,
      //   unique: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      //   unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

//Compound Index, where 1 means ascending & -1 means descending
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// TO BE CONTINUED(request.js) 3. you can't send request to yourself as well
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // since its not string but  object id, so it will get compared like this only
  // checking if fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
  next();
});

// creating model for connectionrequest
const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;

// NOTE: ENUM- for schema level validation
// In a Mongoose schema,
// "enum" refers to a data type that restricts a field to only accept a predefined set of possible values,
// essentially creating a list of allowed options for that field,
// ensuring data integrity by preventing invalid entries from being stored in the database;
// it's a way to explicitly define a set of valid choices for a specific attribute within your document.
