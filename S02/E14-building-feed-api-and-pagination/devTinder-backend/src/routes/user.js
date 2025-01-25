const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// GET all the pending requests (which got "interested", not ignored by fromUserId) & waiting to get accepted/rejected for the loggedIn user(toUserId)
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // returns array of connection requets based on the condition
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // .populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "All received requests fetched successfully!",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).json("ERROR" + err.message);
  }
});

//GET all the matches( connection requests which got "accepted")
// There are two scenarios:
// Akash => Elon (accepted by elon)
// Elon => Mark( accepted by Mark)
// Total number of matches Elon(loggedInUser): 2 ( we need to find these kind of requests)
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    // const data = connectionRequests.map((row) => {
    //   if (row.fromUserId === loggedInUser._id) {
    //     console.log(row.toUserId);
    //   }
    // });

    res.json({
      message:
        "All Connections/matches fetched successfully for " +
        loggedInUser.firstName,
      // data: connectionRequests,
      data,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
module.exports = userRouter;
