import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import Board from "../components/board/Board";

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/board" component={Board} />
      </Switch>
    </Router>
  );
};

export default Routes;
