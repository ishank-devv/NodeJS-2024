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

  if (!feed) return;

  // NO more users are ther on feed for particular logged-in user,
  // either logged-in user swiped right or left
  // Even if it is only one user then feed.length === 1
  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    // intially feed is empty & userEffect runs after 1st mount/render then its gets data so feed data can be null( which will become feed's user data in user card )
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
