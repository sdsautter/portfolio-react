import React, {Component} from "react";

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
            <div className="col-10 main-game text-center">
                <p className="waiting-stage">{this.waitingRender()}</p>    
            </div>
        )
    }
}