const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //status- adding validation to status(only "ignored", "interested" will be allowed, "accepted", "rejected" will not be allowed)
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type: " + status,
        });
      }

      //toUserId- check whether toUserId exists in DB or not( to avoid sending request to random toUserId eg- 678fce3d455f8028a7bd2aa7 )
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "the user you're trying to send request to doesn't exist!",
        });
      }

      // checking duplicate request/deadlock exists
      //1.checking if fromUserId(Akash), toUserId(Elon) already exists in DB or not( implemented at schema as well)
      //2.checking if fromUserId(Elon), toUserId(Akash) already exists in DB or not(reverse of 1.)(only implemented here(api/code level) only)
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        //mongoose/mongodb OR( Similiarly there's $and query)
        $or: [
          //OR Conditions
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
          // 3. you can't send request to yourself as well
          // check models/connectionRequest.js
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request already exists!" });
      }

      // creating new instance of connectionRequest using ConnectionRequestModel
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      //saving to DB
      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
