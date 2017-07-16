// Include React
// var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
// var Link = require("react-router").Link;

import React, {Component} from 'react';


// Create the Main component
export default class Main extends Component {

  // Here we render the component
  render() {

    return (
        <div className="container-fluid z-index-2">
        <div className="row">
            <div className="col">
                <h1 className="text-center">Acronauts</h1>
            </div>
        </div>
        <br /><br /><br />
        <div className="row justify-content-center">
            <div className="col-10 main-game">
                <div className="row">
                    <div className="col-9">
                        <div className="row text-center">
                            <div className="col-6 offset-4">
                                <p className="time-left">60</p>
                            </div>
                        </div>
                        <br />

                        <div className="row text-center">
                            <div className="col-6 offset-4">
                                <p className="game-letters">GUB</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="row player-info">
                            <div className="col-4 align-self-center">
                                <img className="avatar" src="assets/images/avatar1.png" />
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="player-name">Scott</p>
                                    </div>
                                    <div className="col-5">
                                        <p className="points-text">Points:</p>
                                    </div>
                                    <div className="col-7">
                                        <p className="player-points">1356</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row player-info">
                            <div className="col-4 align-self-center">
                                <img className="avatar" src="assets/images/avatar2.png" />
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="player-name">Phil</p>
                                    </div>
                                    <div className="col-5">
                                        <p className="points-text">Points:</p>
                                    </div>
                                    <div className="col-7">
                                        <p className="player-points">356</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row player-info">
                            <div className="col-4 align-self-center">
                                <img className="avatar" src="assets/images/avatar3.png" />
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="player-name">Tolu</p>
                                    </div>
                                    <div className="col-5">
                                        <p className="points-text">Points:</p>
                                    </div>
                                    <div className="col-7">
                                        <p className="player-points">357</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row player-info">
                            <div className="col-4 align-self-center">
                                <img className="avatar" src="assets/images/avatar4.png" />
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="player-name">Byron</p>
                                    </div>
                                    <div className="col-5">
                                        <p className="points-text">Points:</p>
                                    </div>
                                    <div className="col-7">
                                        <p className="player-points">-50</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <div className="input-group">
                            <input id="playerAnswer" type="text" className="form-control" placeholder="Type Here" />
                            <span className="input-group-btn">
                                    <button id="answerSubmit" className="btn btn-secondary" type="button">Submit!</button>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
