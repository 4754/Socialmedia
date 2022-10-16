import React, { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadPost, uploadImage } from "../../actions/uploadAction";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state) => state.authReducer.authData.user);
  const postData = useSelector((state) => state.postReducer);
  const OnImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // we should not store multimedia on Mongodb, so i am storing on server local storage

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      //console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(uploadPost(newPost));
    // To reset after Share
    reset();
  };

  return (
    <div className="PostShare">
      <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
      <div>
        <input
          type="text"
          placeholder="What's happening..."
          ref={desc}
          required
        />
        <div className="PostOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={postData.loading}
          >
            {postData.loading ? "Loading" : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={OnImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
