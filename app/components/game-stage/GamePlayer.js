import React, { Component } from "react";

export default class GamePlayer extends Component {
    
    constructor() {
        super();
        this.renderPlayer = this.renderPlayer.bind(this);
        this.renderPoints = this.renderPoints.bind(this);
    }

    renderPlayer(key) {
        const playerName = this.props.details[key].username;

        return <p key={key} className="player-name">{playerName}</p>
    }

    renderPoints(key) {
        const playerPoints = this.props.details[key].points;

        return <p key={key} className="player-points">{playerPoints}</p>
    }

    render() {     

        return(
            <div className="row player-info">
                <div className="col-4 align-self-center">
                    <img className="avatar" src="assets/images/avatar1.png" />
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">
                        {this.renderPlayer}
                        </div>
                        <div className="col-5">
                            <p className="points-text">Points:</p>
                        </div>
                        <div className="col-7">
                        {this.renderPoints}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}