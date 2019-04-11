import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";

import { Route } from "react-router-dom";

import JokesList from "./comps/jokes_list.js";
import NavBar from "./comps/nav.js";
import Form from "./comps/form.js";
import Home from "./comps/home.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Form} />
        <Route path="/login" component={Form} />
        <Route path="/jokes" component={JokesList} />
      </div>
    );
  }
}

export default App;
