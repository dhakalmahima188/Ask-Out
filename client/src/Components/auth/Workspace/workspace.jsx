import "./workspace.css";
import Add from "@material-ui/icons/Add";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../../Utils/httpClient";
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
        <div className="login_emailPass">
          <div className="login_inputField">
            {inputList.map((x, i) => {
              return (
                <>
                  {" "}
                  <h3>{i === 0 ? "Enter your email" : `Teammate ${i}`}</h3>
                  <div className="login_inputField">
                    <input
                      name="email"
                      placeholder={
                        i === 0
                          ? "Enter your email"
                          : `Enter your teammate's email`
                      }
                      variant="filled"
                      value={x.email}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  {inputList.length - 1 === i && (
                    <button onClick={handleAddClick}>
                      {" "}
                      Click to add people
                      <Add />
                    </button>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <button onClick={handleSend}> Submit</button>
      </>
    ) : (
      <h3>Please Check Your Email!!</h3>
    )
  ) : (
    <>
      <div className="login_desc">
        <Link to="/">Go Back</Link>
        <p>Register Your Workplace</p>
      </div>
      <div className="login_authOptions">
        <h3>Enter the name of your Workplace</h3>
        <div className="login_inputFields">
          <input name="name" onChange={handleWorkChange} />
        </div>
        <button onClick={handleSubmit}>Create</button>
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
