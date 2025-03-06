const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

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

// - user should see all the cards except:
// - 1. His own card
// - 2. His connections / he accepted/ he got rejected (connection status: "accepted")
// - 3. He rejected / He got rejected (connection status: "rejected")
// - 4. He Ignored people / He got Ignored by People (connection status: "ignored")
// - 5. He already sent the connection request / He already received connection request (connection status: "interested")
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // /user/feed?page=1&limit=10 ( by default for 1st page or /user/feed)
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    // If attacker is trying to fetch lakh of users at once, it could crash the Db /user/feed?page=1&limit=100000
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //find out connection requests(1st swipe: sent("interested","ignored") + 2nd Swipe: received("accepted","rejected"))
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      //select just filters out of all the data
    })
      .select("fromUserId toUserId status")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    // - set datastructure is like an array which only contains unique elements & it will skip any duplicate if you try to push
    // putting all id's from connectionRequests(sent+received) + loggedInUser's Id
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId._id.toString());
      hideUsersFromFeed.add(req.toUserId._id.toString());
    });
    // console.log(hideUsersFromFeed);

    // Want every user on feed except [ connectionRequests(sent+received), that i've put inside set + user who is already logged in(checking again) ]
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    // console.log(users);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
module.exports = userRouter;
