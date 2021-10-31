import "./register.css";
import React from 'react';
import Add from "@material-ui/icons/Add";
function Workspace() {
  const submits = () => {
    console.log("Submitted");
  };

  return (
    <div className="register">
      <div className="login_container">
        <div className="login_desc">
          <p>Register Your Email</p>
        </div>

        <h3>Please Enter the credentials:</h3>

        <div className="login_inputField">
          <input name="email" placeholder="Email" variant="filled" />
          <input name="password" placeholder="Password" type="password" />
          <input name="name" placeholder="Anynonymous name:" type="text" />

          <select name="tag" id="tag">
            <option value="IT">IT</option>
            <option value="FINANCE">FINANCE</option>
            <option value="HR">HR</option>
          </select>

         
      </div>
       <button onClick={submits}>Submit</button>
        </div>
    </div>
  );
}

export default Workspace;