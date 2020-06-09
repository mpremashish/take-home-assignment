import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import container from "./Components/containers";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={container} />
      </Router>
    );
  }
}
export default App;
