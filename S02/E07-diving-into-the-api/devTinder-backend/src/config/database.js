const mongoose = require("mongoose");

// connecting your application to your mongo db cluster.
// mongoose.connect returns you a promise & tell if the connect was success or not.
// so use it inside an Async function
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NNode:P7kcwl40Z9LJ0i6c@nnode.6avmp.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

//NOTE: cluster has multiple DBs
// this is referring to the cluster
// "mongodb+srv://NNode:P7kcwl40Z9LJ0i6c@nnode.6avmp.mongodb.net/"

// this is referring a particular DB (HelloWorld) in cluster
// "mongodb+srv://NNode:P7kcwl40Z9LJ0i6c@nnode.6avmp.mongodb.net/HelloWorld"
