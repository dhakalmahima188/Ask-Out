import React from 'react';
import Navbar from './Navbar/navbar';
import Feed from './Feed/feed';
import Sidebar from './Sidebar/sidebar';
// import Widget from './Widget';

function Main() {
    return (
        <div className="askout">
            <Navbar />
            <div className="askout_content">
                <Sidebar />
                <Feed />
                {/* <Widget /> */}
            </div>
        </div>
    )
}

export default Main;
