import React, {Component} from "react";

export default class VoteTime extends Component{

    constructor() {
       super();
   }
    
    render() {
        return (
            <div className="row">
                <div className="col text-center">
                    <p className="time-left">{this.props.timeLeft}</p>
                </div>
            </div>
        )
    }
}