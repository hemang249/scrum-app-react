import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Home from "../components/home/Home";

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
