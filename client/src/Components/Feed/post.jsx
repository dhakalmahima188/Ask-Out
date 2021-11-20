import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./feed.css";
import Modal from "react-modal";
import httpClient from "../../Utils/httpClient";
import "../Navbar/navbar.css";
Modal.setAppElement("#root");

function Post({ Id, id, question, timestamp, state }) {
  const [username, setuser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [getAnswer, setGetAnswer] = useState([{}]);
  const [view, setview] = useState(true);
  const [fetch, setfetch] = useState(false);
  const [likecount, setlikecount] = useState(false);
  const [isactive, setactive] = useState(true);
  const defaultForm = {
    answer: "",
  };
  const [data, setdata] = useState({
    ...defaultForm,
  });
  const [error, setError] = useState({
    ...defaultForm,
  });
  const [valid, setValid] = useState(false);
  //to fetch username
  useEffect(() => {
    httpClient
      .GET("employee/" + Id, {})
      .then((response) => {
        setuser(response.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Id]);

  //for view answer
  const viewAnswer = (id) => {
    setview((prevview) => !prevview);
    !fetch
      ? httpClient
          .GET("question/" + id, {})
          .then((response) => {
            getvalue(id);
            setfetch(true);
          })
          .catch((err) => {
            console.log(err);
          })
      : view
      ? getvalue(id)
      : console.log("okay");
  };
  //handling answers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((preState) => ({
      ...preState,
      [name]: value,
    }));
    let errorMsg;
    switch (name) {
      case "answer":
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

  //submit answer
  const handleAnswer = (id) => {
    httpClient
      .PUT(
        "question/answer/" + id,
        {
          answer: data.answer,
          employee_name:localStorage.getItem("username")
        },
        {}
      )
      .then((response) => {
        setOpenModal(false);
        getvalue(id);
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(false);
      });
  };
  const getvalue = (id) => {
    httpClient
      .GET("question/" + id, {})
      .then((response) => {
        setGetAnswer(response.data[0].replies);
        setlikecount(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //for like/dislike
  const handleClick = (id, answers, i) => {
    httpClient
      .PUT("question/answer/like/" + id, { id: answers }, {})
      .then((response) => {
        setlikecount(true);
        getvalue(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //active/close
  const activation = (e) => {
    httpClient
      .PUT("question/" + id, { ques_state: "Closed" }, {})
      .then((response) => {
        setactive(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let btn = valid ? (
    <button onClick={() => handleAnswer(id)} type="sumbit" className="add">
      Add Answer
    </button>
  ) : (
    <button onClick={() => handleAnswer(id)} type="sumbit" className="add">
      Add Answer
    </button>
  );
  return (
    <div className="post">
      <div className="post_info">
        <Avatar />
        &nbsp; {username}
        <small>
          {new Date(timestamp).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </small>
        <button onClick={() => activation(id)} className="post_btnClose">
          {state}{" "}
        </button>
      </div>

      <div className="post_body">
        <div className="post_question">
          <p>{question}</p>

          {state === "Active" ? (
            <button
              onClick={() => setOpenModal(true)}
              className="post_btnAnswer"
            >
              Answer
            </button>
          ) : (
            <button
              className="post_btnAnswer"
              style={{ backgroundColor: "#e9e3de" }}
            ></button>
          )}

          <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 700,
                height: 600,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-300px",
                marginLeft: "-350px",
                borderRadius: "20px",
              },
            }}
          >
            <div className="modal_question">
              <h6>{question}</h6>
              <p>
                asked by <span className="name"></span> on{" "}
                <span className="name">
                  {new Date(timestamp).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
            <div className="modal_answer">
              <small
                className="text-danger"
                style={{
                  color: "red",
                }}
              >
                {" "}
                {error.answer}{" "}
              </small>
              <textarea
                name="answer"
                // value={answer}
                onChange={handleChange}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal_button">
              <button className="cancel" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              {btn}
            </div>
          </Modal>
        </div>
        <div className="post_answer">
          <hr />
          {view
            ? getAnswer.map((answers, i) => (
                <p key={answers._id} style={{ position: "relative" }}>
                  {
                    <>
                      {" "}
                      {i === 0 ? (
                        ""
                      ) : (
                        <span>
                          <h3 style={{ fontSize: "15px" }}>{answers.answer}</h3>

                          <span
                            style={{
                              position: "absolute",
                              color: "gray",
                              fontSize: "small",
                              right: "0px",
                              top: "-5px",
                            }}
                          >
                            <div>
                              <span className="thumbup">
                                <span class="text3">
                                  {answers.employee_name}
                                </span>
                                &nbsp;{" "}
                                <i
                                  className="fa fa-thumbs-o-up"
                                  onClick={() =>
                                    handleClick(id, answers._id, i)
                                  }
                                ></i>
                                {""}
                              </span>
                              <span className="text4">
                                &nbsp;{" "}
                                {answers.likes.length === 0
                                  ? ""
                                  : answers.likes.length}
                              </span>
                            </div>
                          </span>
                        </span>
                      )}
                    </>
                  }
                </p>
              ))
            : ""}
        </div>
      </div>

      <div className="post_footer">
        <button
          onClick={() => viewAnswer(id)}
          type="sumbit"
          className="view-ans-btn"
        >
          View Answer
        </button>
      </div>
    </div>
  );
}

export default Post;
