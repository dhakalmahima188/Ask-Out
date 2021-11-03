import React, { useState } from "react";
import "./login.css";
import Add from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import httpClient from "../../../Utils/httpClient";

function Login(props) {
  const defaultForm = { username: "", password: "" };
  const [data, setdata] = useState({
    ...defaultForm,
  });
  const [error, setError] = useState({ ...defaultForm });
  const [valid, setValid] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((preState) => ({
      ...preState,
      [name]: value,
    }));
    let errorMsg;
    switch (name) {
      case "username":
        errorMsg = data[name] ? "" : "Required field*";
        break;
      case "password":
        errorMsg = data[name] ? "" : "Required field*";
        break;
      default:
        break;
    }
    setError((preState) => ({
      ...preState,
      [name]: errorMsg,
    }));
    const errors = Object.values(error).filter((items) => items);
    setValid(errors.length === 0);
    console.log(data);
  };
  const submits = (e) => {
    e.preventDefault();
    httpClient
      .POST(
        "auth/login",
        {
          username: data.username,
          password: data.password,
        },
        {}
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("password", response.data.user.password);
        props.history.push("/feed", { username: data.username });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let btn = valid ? (
    <button onClick={submits}>Submit</button>
  ) : (
    <button disabled onClick={submits}>
      Click
    </button>
  );
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_auth">
          <div className="login_authOptions">
            <div className="login_authOption">
              <Link to="/workspace">
                {" "}
                <Add /> Create Workspace
              </Link>{" "}
            </div>
          </div>
          <div className="login_emailPass">
            <div className="login_label">
              <h2>Login</h2>
            </div>
            <div className="login_inputFields">
              <div className="login_inputField">
                <small className="text-danger" style={{ color: "red" }}>
                  {error.username}
                </small>
                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  placeholder="Username"
                />
              </div>

              <div className="login_inputField">
                <small className="text-danger" style={{ color: "red" }}>
                  {error.password}
                </small>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            {/* <div className="login_forgot"> */}
            {/* <small>Forgot Password</small> */}
            {btn}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
