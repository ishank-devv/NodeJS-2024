import React, { useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  // this user is logged in user
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      // after 3 sec , clear Toast/notification
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
      // console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="py-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url:</legend>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age:</legend>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender:</legend>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About:</legend>
                <textarea
                  className="textarea"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Bio"
                ></textarea>
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
