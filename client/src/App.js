import React from "react";
import "./App.css";
import Login from "./Components/auth/Login/login";
import Register from "./Components/auth/Register/register";

import Main from './Components/main.component.js'

function App() {
  return (
    <>
      <div className="App">
      <Register/>
      {/* <Login/> */}
     {/* <Main/> */}
      </div>
    </>
  );
}

export default App;
