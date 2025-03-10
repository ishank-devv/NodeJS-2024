import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  // console.log(feed);

  const getfeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // TO DO: handle error
      console.log(err);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  return (
    // intially feed is empty & userEffect runs after 1st mount/render then its gets data
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
