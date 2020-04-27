import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../containers/Home";

export const AppRoutes = () => {
  return (
    <Router>
      <p> Nav</p>
      <div>
        <Link to="/visual">Prueba</Link>
      </div>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
