import { Avatar } from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  MoreHorizOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./feed.css";
import Modal from "react-modal";
import httpClient from "../../Utils/httpClient";

import "../Navbar/navbar.css";

Modal.setAppElement("#root");

function Post({ Id,key,id, question, timestamp ,replies}) {
  const [username, setuser] = useState("");
  const [openModal, setOpenModal] = useState(false);
//   const [answer, setAnswer] = useState("");
// const answers=replies[0].replies
  const [getAnswer, setGetAnswer] = useState([{replies}]);
  console.log(getAnswer)
//   console.log(replies[0])

  const[getAnswervalue,setGetAnswervalue] = useState(false)
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
  const handleAnswer = (id) => {
    // e.preventDefault();
    httpClient
    .PUT(
      "question/answer/"+id,
      {
        answer: data.answer,
      },
      {}
    )
    .then((response) => {
      setOpenModal(false);
      getvalue(id)
        })
    .catch((err) => {
      console.log(err);
      setOpenModal(false);
    });
  };
  const getvalue = (id) => {
    httpClient
    .GET("question/"+id, {})
    .then((response) => {
        console.log(response.data[0].replies)
        setGetAnswer(response.data[0].replies);
    })
    .catch((err) => {
      console.log(err);
    });
  }
//   let ans=setGetAnswervalue?getAnswer:replies.replies
  let btn = valid ? (
    <button onClick={()=>handleAnswer(id)} type="sumbit" className="add">
    Add Answer
  </button>  ) : (
    <button onClick={()=>handleAnswer(id)} type="sumbit" className="add">
    Add Answer
  </button>
  );
  return (
    <div
      className="post"
      // onClick = {() =>
      // dispatch(
      //     setQuestionInfo({
      //         questionId: Id,
      //         questionName: question,
      //     })
      // )}
    >
      <div className="post_info">
        <Avatar
        />
        {username}
        <small>
          {new Date(timestamp).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </small>
      </div>

      <div className="post_body">
        <div className="post_question">
          <p>{question}</p>
          <button onClick={() => setOpenModal(true)} className="post_btnAnswer">
            Answer
          </button>

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
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                 
                </span>{" "}
                on{" "}
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
                name='answer'
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
        
          {getAnswer.map((answers ) => (
            <p key={answers._id} style={{ position: "relative", paddingBottom: "5px" }}>
              {
                  /* Id === answers.questionId ? ( */
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    <span
                      style={{
                        color: "lightcoral",
                      }}
                    >
                      {/* {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "} */}
                      {/* on{" "}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()} */}
                    </span>
                  </span>
                </span>
              /* ) : (
                ""
              ) */
              }
            </p>
          ))}
        </div>
        <img
          // src={image}
          alt=""
        />
      </div>

      <div className="post_footer">
        <div className="post_footerActions">
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>

        <div className="post_footerRight">
          <MoreHorizOutlined />
        </div>
      </div>
    </div>
  );
}

export default Post;
