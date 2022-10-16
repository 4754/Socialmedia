import React from "react";
import "./FollowersCard.css";
import User from "../Users/User";
import { useEffect } from "react";
import { useState } from "react";
import { getAllUsers } from "../../api/UserRequest";
import { useSelector} from 'react-redux';

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const {user} = useSelector( (state) => state.authReducer.authData);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUsers();
      setPersons(data);
      // console.log(data);
    };
    fetchPersons();
  }, []);
  
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
