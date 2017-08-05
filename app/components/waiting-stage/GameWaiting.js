import React, {Component} from "react";
import PlayerWaiting from "./PlayerWaiting.js";
import LeaveButton from "../LeaveButton.js";

export default class WaitingStage extends Component {
    constructor() {
        super();
        this.waitingRender = this.waitingRender.bind(this);
    }
    
    waitingRender() {
        if (this.props.players.length === 1) {
            return "Waiting for 2 more players!"
        } else if (this.props.players.length === 2) {
            return "Waiting for 1 more player!"
        } else if (this.props.players.length >= 3) {
            return "Game is about to start."
        } else {
            return "Waiting for players!"
        }
    }
    
    render() {
        return (
            <div className="col-md-11 col-sm-12 main-game text-center">
                <div className="row text-left">
                    <LeaveButton 
                        gameInstanceId={this.props.gameInstanceId} 
                        setFindGameFalse={this.props.setFindGameFalse}
                    />
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-8">
                    <p className="waiting-stage">{this.waitingRender()}</p>    
                    </div>
                    <div className="col-sm-12 col-md-4">
                        {
                            Object.keys(this.props.players).map((key) => {
                                var currentPlayer = this.props.players[key];
                                return (<PlayerWaiting key={key} username={currentPlayer.username} />)
                            })    
                        }   
                    </div>
                </div>
            </div>
        )
    }
}