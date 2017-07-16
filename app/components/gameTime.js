import React, {Component} from "react";

export default class GameInstance extends Component{
    render() {
        return (
            <div className="row text-center">
                <div className="col-6 offset-4">
                    <p className="time-left">60</p>
                </div>
            </div>
        )
    }
}