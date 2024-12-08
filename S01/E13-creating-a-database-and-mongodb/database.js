const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb+srv://NNode:P7kcwl40Z9LJ0i6c@nnode.6avmp.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "HelloWorld";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  // the following code examples can be pasted here...

  const data = {
    firstname: "Akash",
    lastname: "Saini",
    city: "Noida",
    phoneNumber: "9876543210",
  };
  //   // Insert many  Document
  // const insertResult = await collection.insertMany([data]);
  // console.log("Inserted documents =>", insertResult);

  // // update document
  // const updateResult = await collection.updateOne(
  //   { firstname: "Akash" },
  //   { $set: { pinCode: 110009 } }
  // );
  // console.log("Updated documents =>", updateResult);

  // // remove document
  // const deleteResult = await collection.deleteMany({ firstname: "Akash" });
  // console.log("Deleted documents =>", deleteResult);

  // find all documents
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  // // count all documents
  // const countResult = await collection.countDocuments({});
  // console.log("Count of documents in the User collection => ", countResult);

  // // Find all documents with a "filter" of firstName: Sam
  // const result = await collection.find({ firstname: "Sam" }).toArray();
  // console.log("result => ", result);

  return "done.";
}

//returning us a promise & closing the connection
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

//find()
// why find() returns a cursor & not array ?
// So that we could chain multiple mehotds eg: find({firstname: "Sam"}).countDocuments()
