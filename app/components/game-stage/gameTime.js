import React, {Component} from "react";

export default class GameTime extends Component{
    constructor() {
        super();
        this.timeCountdown = this.timeCountdown.bind(this);
    }
    
    timeCountdown(time) {
        setInterval(function() {
            time--;

            if (time > 0) {
                console.log(time);
                return time;
            }
        }, 1000);   
    }
    
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