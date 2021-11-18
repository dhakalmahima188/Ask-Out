import "./workspace.css";
import Add from "@material-ui/icons/Add";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../../Utils/httpClient";
import email_image from "./email.png";
function Workspace(props) {
  const [data, setdata] = useState({ name: "" });
  const [inputList, setInputList] = useState([{ email: "" }]);
  const [created_workspace, setCreate] = useState(false);
  const [msg, setMsg] = useState(false);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { email: "" }]);
  };

  const handleWorkChange = (e) => {
    const { name, value } = e.target;
    setdata(() => ({
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    httpClient
      .POST("workspace", data, {})
      .then((response) => {
        setCreate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSend = (e) => {
    e.preventDefault();
    httpClient
      .POST(
        "workspace/add",
        {
          email: inputList.map(({ email }) => email),
          name: Object.values(data),
        },
        {}
      )
      .then((response) => {
        setMsg(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let content = created_workspace ? (
    !msg ? (
      <>
        <div className="workspace">
          <div className="workspace_desc">
            <p>Enter Email</p>
          </div>
          <div className="workspace-email">
            <div className="workspace-inputs">
              {inputList.map((x, i) => {
                return (
                  <>
                    {" "}
                    {/* <h5>{i === 0 ? "Your email" : `Teammate ${i}`}</h5> */}
                    <div className="workspace-input">
                      <input
                        name="email"
                        placeholder={
                          i === 0 ? "Your Email" : `Email of Teammate ${i}`
                        }
                        variant="filled"
                        value={x.email}
                        onChange={(e) => handleInputChange(e, i)}
                        autocomplete="off"
                      />
                    </div>
                    {inputList.length - 1 === i && (
                      <button
                        className="workspace-add"
                        onClick={handleAddClick}
                      >
                        {" "}
                        Add
                        <Add />
                      </button>
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <button className="buttons" onClick={handleSend}>
            {" "}
            Submit
          </button>
        </div>
      </>
    ) : (
      <div className="check">
        <h3>Please Check Your Email !!</h3>
        <img src={email_image} height="300px" width="300px" alt="question" />
      </div>
    )
  ) : (
    <>
      <div className="workspace_desc">
        <Link to="/">Go Back</Link>
        <p>Register Your Workplace</p>
      </div>
      <div className="login_authOptions">
        <h3>Enter the name of your Workplace</h3>
        <div className="workspace_inputFields">
          <input name="name" onChange={handleWorkChange} autocomplete="off" />
        </div>
        <button className="buttons" onClick={handleSubmit}>
          Create
        </button>
      </div>
      <br />
    </>
  );
  return (
    <div className="register">
      <div className="login_container">{content}</div>
    </div>
  );
}

export default Workspace;
