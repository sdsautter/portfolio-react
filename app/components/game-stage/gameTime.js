import React, {Component} from "react";

export default class GameTime extends Component{
    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="row text-center">
                <div className="col">
                    <p className="time-left">{this.props.timeLeft}</p>
                </div>
            </div>
        )
    }
}
