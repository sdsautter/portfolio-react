// Include React
// var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
// var Link = require("react-router").Link;

import React, {Component} from 'react';
import GameInstance from "./GameInstance";


// Create the Main component
export default class Main extends Component {

  // Here we render the component
  render() {

    return (
      <div className="container-fluid z-index-2">
        <GameInstance />
      </div>
    );
  }
}
