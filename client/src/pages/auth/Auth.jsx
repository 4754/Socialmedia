import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch,useSelector} from 'react-redux';
import { logIn, signUP } from "../../actions/AuthAction";

const Auth = () => {

  const loading = useSelector( (state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  // console.log(loading);
  const [confirmPass, setConfirmPass] = useState(true);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass ? dispatch(signUP(data)) : setConfirmPass(false); 
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };
  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* Right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={onSubmitHandler}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="User Name"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value= {data.username}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm password"
                className="infoInput"
                name="confirmpass"
                onChange={handleChange}
                value= {data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            !Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account. SignUp!"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
            { loading ? "Loading...": isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

// function LogIn() {
//     return(
//         <div className="a-right">
//             <form  className="infoForm authForm">
//                 <h3>Log In</h3>
//                 <div>
//                     <input type="text" placeholder="Username" className="infoInput" name="username" />

//                 </div>
//                 <div>
//                     <input type="text" placeholder="Password" className="infoInput" name="password" />
//                 </div>
//                 <div>
//                     <span style={{fontSize: "12px"}}>Don,t have an account. SignUp!</span>
//                     <button className='button infoButton' type='submit'>Log In</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// function Signup() {
//     return(
//         <div className="a-right">
//             <form  className="infoForm authForm">
//                 <h3>Sign up</h3>
//                 <div>
//                     <input type="text" placeholder="First Name" className="infoInput" name="firstname" />
//                     <input type="text" placeholder="Last Name" className="infoInput" name="lastname" />
//                 </div>
//                 <div>
//                     <input type="text" placeholder="User Name" className="infoInput" name="username" />
//                 </div>

//                 <div>
//                     <input type="text" placeholder="Password" className="infoInput" name="password" />
//                     <input type="text" placeholder="Confirm password" className="infoInput" name="confirmpass" />
//                 </div>
//                 <div>
//                     <span style={{fontSize: "12px"}}>Already have an account. Login!</span>
//                     <button className='button infoButton' type='submit'>Signup</button>
//                 </div>

//             </form>
//         </div>
//     )
//}

export default Auth;
