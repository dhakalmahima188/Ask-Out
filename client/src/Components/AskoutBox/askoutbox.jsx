import { Avatar } from '@material-ui/core';
import React from 'react'
// import { useSelector } from 'react-redux';
import './askoutbox.css';
// import { selectUser } from '../features/userSlice';

function AskoutBox() {

    // const user = useSelector(selectUser);

    return (
        <div className="askoutBox">
            <div className="askoutBox_info">
                <Avatar 
                    // src = {user.photo}
                />
                {/* <h5>{user.displayName}</h5> */}
            </div>
            <div className="askoutBox_ask">
                <p>Type your question</p>
            </div>
        </div>
    )
}

export default AskoutBox
