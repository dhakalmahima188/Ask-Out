import React from "react";
import "./sidebar.css";

function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <div className="sidebarOptions">
          <div className="sidebarOption"></div>
          <div className="sidebarOption">
            <p>IT</p>
          </div>

          <div className="sidebarOption">
            <p>HR</p>
          </div>
          <div className="sidebarOption">
            <p>Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
