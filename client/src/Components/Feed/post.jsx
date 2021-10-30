import { Avatar } from '@material-ui/core'
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOutlined, ShareOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './feed.css'
import Modal from 'react-modal'
// import { useSelector, useDispatch } from 'react-redux'
// import { selectQuestionId, setQuestionInfo, selectQuestionName } from "../features/questionSlice";
// import { selectUser } from "../features/userSlice";
import '../Navbar/navbar.css'
// import db from '../firebase'
// import firebase from 'firebase'

Modal.setAppElement('#root');

function Post( {Id,question,image,timestamp,askoutUser} ) {

    // const user = useSelector(selectUser);
    // const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    // const questionName = useSelector(selectQuestionName);
    // const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer] = useState("");
    const [getAnswer, setGetAnswer] = useState([]);

    // useEffect(() => {
    //     if (questionId) {
    //       db.collection("questions")
    //         .doc(questionId)
    //         .collection("answer")
    //         .orderBy("timestamp", "desc")
    //         .onSnapshot((snapshot) =>
    //           setGetAnswer(
    //             snapshot.docs.map((doc) => ({ id: doc.id, answers: doc.data() }))
    //           )
    //         );
    //     }
    //   }, [questionId]);

    const handleAnswer = (e) => {

        e.preventDefault();

        // if(questionId)
        // {
        //     db.collection('questions').doc(questionId).collection('answer').add({
        //     user: user,
        //     answer: answer,
        //     questionId: questionId,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     });
        // }
        // console.log(questionId, questionName);
        setAnswer("");
        setOpenModal(false);
    }

    return (
        <div className="post"
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
                    // src = {askoutUser.photo}
                /> 
                {/* <h5>{askoutUser.displayName ? askoutUser.displayName : askoutUser.email}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small> */}
            </div>

            <div className="post_body">
                <div className="post_question">
                    <p>{question}</p>
                    <button onClick = {() => setOpenModal(true)} className="post_btnAnswer">Answer</button>

                    <Modal 
                        isOpen = {openModal}
                        onRequestClose = {() => setOpenModal(false)}
                        shouldCloseOnOverlayClick = {false}
                        style = {{
                            overlay: {
                                width: 700,
                                height: 600,
                                backgroundColor: "rgba(0,0,0,0.8)",
                                zIndex: "1000",
                                top: "50%",
                                left: "50%",
                                marginTop: "-300px",
                                marginLeft: "-350px",
                                borderRadius: "20px"
                            },                        
                        }}
                        >
                        <div className="modal_question">
                            <h1>{question}</h1>
                            <p>
                                asked by <span className="name">{askoutUser.displayName ? askoutUser.displayName : askoutUser.email}</span>{" "} on <span className="name">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                            </p>
                        </div>
                        <div className="modal_answer">
                            <textarea
                                required
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter Your Answer"
                                type="text"
                            />
                        </div>
                        <div className="modal_button">
                            <button className="cancel" onClick={() => setOpenModal(false)}>
                                Cancel
                            </button>
                            <button onClick= {handleAnswer} type="sumbit" className="add">
                                Add Answer
                            </button>
                        </div>
                    </Modal>
                </div>
                <div className="post_answer">
                    {
                        getAnswer.map(({id, answers}) => (
                            <p
                                key = {id}
                                style = {{position: "relative", paddingBottom: "5px",}}>
                                {
                                    Id === answers.questionId ? (
                                        <span>
                                            {answers.answer}
                                        <br/>
                                        <span
                                            style = {{
                                                position: "absolute",
                                                color: "gray",
                                                fontSize: "small",
                                                display: "flex",
                                                right: "0px",
                                            }}
                                        >
                                        <span 
                                            style = {{
                                                color: "lightcoral"
                                            }}
                                        >
                                            {answers.user.displayName ? answers.user.displayName : answers.user.email}{" "}
                                            on {new Date(answers.timestamp?.toDate()).toLocaleString()}
                                        </span>
                                    </span>
                                </span>
                                ) : (
                                    ""
                                )}
                            </p>
                        ))
                    }
                </div>
                <img
                    src={image}
                    alt=""
                />
            </div>

            <div className="post_footer">
                <div className="post_footerActions">
                    <ArrowUpwardOutlined />
                    <ArrowDownwardOutlined />
                </div>
                <RepeatOutlined />
                <ChatBubbleOutlineOutlined />
                <div className="post_footerRight">
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>
        </div> 
    );
}

export default Post
