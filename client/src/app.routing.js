import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./Components/auth/Login/login";
import Workspace from "./Components/auth/Workspace/workspace";
import Register from "./Components/auth/Register/register";
import Navbar from "./Components/Navbar/navbar";
import Sidebar from "./Components/Sidebar/sidebar";
import Feed from "./Components/Feed/feed";
const NotFound = () => {
  return <p>Not found</p>;
};
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        localStorage.getItem("token") ? (
          <>
            <div className="askout">
              <Navbar />
            </div>
            <div className="askout_content">
              <Sidebar />
              {/* <Feed /> */}
              <Component {...routeProps}> </Component>
            </div>
          </>
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    ></Route>
  );
};
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => <Component {...routeProps}> </Component>}
    ></Route>
  );
};
const AppRouting = (props) => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Login}></PublicRoute>
        <PublicRoute eaxct path="/register" component={Register}></PublicRoute>
        <PublicRoute path="/workspace" component={Workspace}></PublicRoute>
        <ProtectedRoute path="/feed" component={Feed}></ProtectedRoute>
        <PublicRoute component={NotFound}> </PublicRoute>
      </Switch>
    </Router>
  );
};

export default AppRouting;
