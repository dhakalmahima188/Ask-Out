import React, { useEffect, useState } from 'react'
import './feed.css'; 
import AskoutBox from '../AskoutBox/askoutbox';
import Post from './post.jsx';

function Feed() {

    const [posts, setPosts] = useState([])

    // useEffect(() => {
    //     db.collection('questions').orderBy('timestamp', "desc").onSnapshot(snapshot => setPosts(snapshot.docs.map((doc) => (({
    //         id: doc.id,
    //         question: doc.data()
    //     })))))
    // }, [])

    return (
        <div className="feed">
            <AskoutBox />
            {/* {
                posts.map(({id, question}) => (
                    <Post 
                        key = {id}
                        Id = {id}
                        image = {question.imageUrl}
                        question = {question.question}
                        timestamp = {question.timestamp}
                        askoutUser = {question.user}
                    />
                ))
            } */}
        </div>
    );
}

export default Feed