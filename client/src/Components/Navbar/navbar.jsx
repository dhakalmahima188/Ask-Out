import React, { useState, useContext, useEffect } from "react";
import "./navbar.css";
import { Avatar, Button } from "@material-ui/core";
import httpClient from "../../Utils/httpClient";
import HomeIcon from "@material-ui/icons/Home";

import Modal from "react-modal";
import { Input } from "@material-ui/core";
import AlertDialog from "./addmember";
import { DataContext } from "../../Context/DataProvider";
function Navbar() {
  const { username, dataid } = useContext(DataContext);
  const [workspace, setworkspce] = useState("");
  const defaultForm = {
    description: "",
    tag: "",
  };
  const [data, setdata] = useState({
    ...defaultForm,
  });
  const [error, setError] = useState({
    ...defaultForm,
  });
  const [valid, setValid] = useState(false);
  useEffect(() => {
    httpClient
      .GET("workspace/" + dataid, {})
      .then((response) => {
        setworkspce(response.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dataid]);

  const logout = async () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const [openModal, setOpenModal] = useState(false);

  const handleQuestion = (e) => {
    e.preventDefault();
    httpClient
      .POST(
        "question",
        {
          description: data.description,
          workspace_id: dataid,
          tag: data.tag,
        },
        {}
      )
      .then((response) => {
        setOpenModal(false);
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(false);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((preState) => ({
      ...preState,
      [name]: value,
    }));
    let errorMsg;
    switch (name) {
      case "description":
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
  };
  let btn = valid ? (
    <button onClick={handleQuestion} type="submit" className="add">
      Add Question
    </button>
  ) : (
    <button disabled onClick={handleQuestion} type="submit" className="add">
      Add Question
    </button>
  );
  return (
    <div className="askout_Header">
      <div className="askout_Header_logo">
        <h3>AskOut</h3>
      </div>
      <div className="askout_Header_icons">
        <div className="askout_Header_icon">
          <HomeIcon />
          <p style={{ marginTop: "-10px" }}>{workspace}</p>
        </div>
      </div>

      <div className="askout_Header_extra">
        <div className="askout_Header_avatar">
          <Avatar />
          {username}{" "}
        </div>

        <AlertDialog workspace={workspace}></AlertDialog>
        <Button onClick={() => setOpenModal(true)}>Ask Questions</Button>
        <Modal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: "grey",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
              borderRadius: "20px",
            },
          }}
        >
          <div className="modal_title">
            <h5>Add Questions</h5>
          </div>
          <div className="modal_info">
            <Avatar className="avatar" />
            &nbsp; {username}
          </div>

          <div className="modal_field">
            <small
              className="text-danger"
              style={{
                color: "red",
              }}
            >
              {" "}
              {error.description}{" "}
            </small>
            <Input
              onChange={handleChange}
              name="description"
              // value={input}
              type="text"
              placeholder="Ask your question with 'What', 'How', 'Why', etc "
              autocomplete="off"
            />
            <select
              name="tag"
              id="tag"
              onChange={handleChange}
              className="selecttag"
            >
              <option value="none" selected disabled hidden defaultValue>
                Select a Tag{" "}
              </option>{" "}
              <option value="IT"> IT </option>{" "}
              <option value="FINANCE"> FINANCE </option>{" "}
              <option value="HR"> HR </option>{" "}
            </select>
          </div>
          <div className="modal_buttons">
            <button onClick={() => setOpenModal(false)} className="cancel">
              Cancel
            </button>
            {btn}
          </div>
        </Modal>
        <button className="post_btnAnswer" onClick={logout}>
          Logout{" "}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
