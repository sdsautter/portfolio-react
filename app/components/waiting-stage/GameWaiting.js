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
        } else {
            return "Waiting for players!"
        }
    }
    
    render() {
        return (
            <div className="col-11 main-game text-center">
            <LeaveButton gameInstanceId={this.props.gameInstanceId} />
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