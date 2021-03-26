import React from "react";
import "./App.css";
import axios from "axios";

import DashBoard from "./pages/DashBoard";
import AddFood from "./pages/AddFood";

import Nav from "./components/Nav";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Calculate from "./pages/Calculate";

axios.defaults.baseURL = "https://notion-nutrition.herokuapp.com/api/";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path="/" exact component={DashBoard}></Route>
          <Route path="/add" component={AddFood}></Route>
          <Route path="/calculate" component={Calculate}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
