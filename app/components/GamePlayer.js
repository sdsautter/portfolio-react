import React, { Component } from "react";

export default class GamePlayer extends Component {
    render() {
        return(
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
        )
    }
}