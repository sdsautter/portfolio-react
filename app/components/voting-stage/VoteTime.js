import React, {Component} from "react";

export default class VoteTime extends Component{

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
            <div className="row">
                <div className="col text-center">
                    <p className="time-left">{this.timeCountdown(45)}</p>
                </div>
            </div>
        )
    }
}