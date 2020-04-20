import React, { useContext } from "react";
import * as THREE from "three";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import { threeContext as AppContext, currentState } from "./context/main";

const App = () => {
  const context = useContext(AppContext);
  const { scene } = context;
  scene.background = new THREE.Color("rgb(0, 0, 0)");
  scene.name = "Escena principal";
  scene.add(new THREE.HemisphereLight(0xff5533, 1.5));

  return (
    <AppContext.Provider value={currentState}>
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
    </AppContext.Provider>
  );
};

export default App;
