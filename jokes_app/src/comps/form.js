import React, { useState } from "react";
import axios from "axios";

const Form = props => {
  const [name, setName] = useState("");
  const [passw, setPassword] = useState("");
  const [logIn, setLogin] = useState("Logged In");
  const [signupMsg, setSignupMsg] = useState();
  const [errMsg, setErrMsg] = useState();

  const capInput = e => {
    switch (e.target.id) {
      case "name": {
        setName(e.target.value);
        break;
      }
      case "password": {
        setPassword(e.target.value);
        break;
      }
    }
  };

  const newUserRegister = e => {
    e.preventDefault();
    if (props.location.pathname === "/signup") {
      const newUser = {
        username: name,
        password: passw
      };
      const regApi = "http://www.localhost:3300/api/register";
      axios
        .post(regApi, newUser)
        .then(res => {
          setSignupMsg("Successful Signup!!!");
        })
        .catch(err => {
          setErrMsg(err.response.data.Error);
        });
    } else {
      const newUser = {
        username: name,
        password: passw
      };
      const regApi = "http://www.localhost:3300/api/login";
      axios
        .post(regApi, newUser)
        .then(res => {
          window.localStorage.setItem("token", res.data);
          setLogin("");
          setLogin("Logged In");
        })
        .catch(err => {
          setErrMsg(err.response.data.Error);
        });
    }
  };

  return localStorage.getItem("token") ? (
    <div>
      {logIn} {console.log(logIn)}
    </div>
  ) : (
    <div className="formCont" onSubmit={newUserRegister}>
      <div
        className={
          props.history.action === "REPLACE" ? "messege" : "message hidden"
        }
      >
        Please Log In
      </div>
      {signupMsg ? (
        <div className="success"> {signupMsg} </div>
      ) : (
        <form className="form">
          <div className="nameField setForm">
            <label htmlFor="name" className="labelName label">
              Name:{" "}
            </label>
            <input type="text" id="name" onChange={capInput} />
          </div>
          <div className="passField setForm">
            <label htmlFor="password" className="labelPass label">
              Password:{" "}
            </label>
            <input type="password" id="password" onChange={capInput} />
          </div>
          <button className="formSubmit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Form;
