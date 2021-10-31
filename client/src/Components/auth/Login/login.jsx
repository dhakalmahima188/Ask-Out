import { ArrowForwardIos } from '@material-ui/icons'
// import logo from '../../images/ask-out logo.png';
import React, { useState } from 'react';
import './workspace.jpg';
import './login.css';
import Add from '@material-ui/icons/Add';
import background from "./purple.png";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   
    return (
        <div className="login">
            <div className="login_container">
                <div className="login_auth">
                    <div className="login_authOptions">
                      <div className="login_authOption">
                        <Add /> <span>Create Workspace</span>
                        </div>
                        </div>
                    <div className="login_emailPass">
                        <div className="login_label">
                            <h2>Login</h2>
                        </div>
                        <div className="login_inputFields">
                            <div className="login_inputField">
                                <input
                                    value = {email}
                                    onChange = {(e) => setEmail(e.target.value)}
                                    type="text"
                                    placeholder="Email"
                                />
                            </div> 

                            <div className="login_inputField">
                                <input
                                    value = {password}
                                    onChange = {(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="login_forgot">
                            <small>Forgot Password</small>
                            <button type="submit" 
                            // onClick={handleLogin}
                            >
                            Login</button>
                        </div>
                        
                    </div>
                </div>
              
            </div>
        </div>
    )
}

export default Login
