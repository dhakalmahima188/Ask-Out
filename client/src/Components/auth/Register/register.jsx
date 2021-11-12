import React, { useState } from "react";
import httpClient from "../../../Utils/httpClient";
import queryString from "query-string";
import image from "./ques.png";

import "./register.css";

function Register(props) {
  const [value] = useState({
    name: Object.values(queryString.parse(props.location.search))[0],
  });
  const defaultForm = {
    username: "",
    email: "",
    password: "",
    tag: "",
  };
  const [data, setdata] = useState({
    ...defaultForm,
  });
  const [error, setError] = useState({
    ...defaultForm,
  });
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
        errorMsg = data[name]
          ? data[name].match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            ? ""
            : "Must contain at least one numeric digit, one uppercase and one lowercase letter, and at least 8 or more characters"
          : "Required Field*";
        break;
      case "email":
        errorMsg = data[name]
          ? data[name].includes("@")
            ? ""
            : "Invalid email"
          : "Required field*";
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
  };
  const submits = (e) => {
    e.preventDefault();
    httpClient
      .POST(
        "auth/register",
        {
          email: data.email,
          username: data.username,
          name: value.name,
          password: data.password,
          tag: data.tag,
        },
        {}
      )
      .then((response) => {
        localStorage.setItem("workspace", value.name);

        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let btn = valid ? (
    <button onClick={submits}> Submit </button>
  ) : (
    <button disabled onClick={submits}>
      Submit{" "}
    </button>
  );

  return (
    <div className="register-form">
      <div className="reg_container">
        <div className="image">
          <img src={image} height="350px" width="300px" alt="question" />
        </div>
        <div className="reg_form">
          <div className="reg-desc">
        <p>REGISTER</p>
        </div>
        <div className="register_inputField">
          <small
            className="text-danger"
            style={{
              color: "red",
            }}
          >
            {" "}
            {error.email}{" "}
          </small>
          <input
            name="email"
            placeholder="Email"
            variant="filled"
            onChange={handleChange}
            autocomplete="off"
          />
          <small
            className="text-danger"
            style={{
              color: "red",
            }}
          >
            {" "}
            {error.password}{" "}
          </small>
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />{" "}
          <small
            className="text-danger"
            style={{
              color: "red",
            }}
          >
            {" "}
            {error.username}{" "}
          </small>
          <input
            name="username"
            placeholder="Anynonymous Username:"
            type="text"
            onChange={handleChange}
            autocomplete="off"
          />
          <small
            className="text-danger"
            style={{
              color: "red",
            }}
          >
            {" "}
            {error.tag}{" "}
          </small>
          <select name="tag" id="tag" onChange={handleChange}>
            <option value="none" selected disabled hidden>
              Select a Tag{" "}
            </option>{" "}
            <option value="IT"> IT </option>{" "}
            <option value="FINANCE"> FINANCE </option>{" "}
            <option value="HR"> HR </option>{" "}
          </select>{" "}
        </div>{" "}
        {btn}{" "}
      </div>{" "}
    </div>
    </div>
  );
}

export default Register;
