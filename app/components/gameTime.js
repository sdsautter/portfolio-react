import React, {Component} from "react";

export default class GameTime extends Component{
    render() {
        return (
            <div className="row text-center">
                <div className="col-6 offset-4">
                    <p className="time-left">{this.props.timeLeft}</p>
                </div>
            </div>
        )
    }
}