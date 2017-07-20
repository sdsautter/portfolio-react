import React, {Component} from "react";

export default class GameLetters extends Component{
    render() {
        return (
            <div className="row text-center">
                <div className="col-6 offset-4">
                    <p className="game-letters">{this.props.letters}</p>
                </div>
            </div>
        )
    }
}