import React, {Component} from "react";

export default class GameLetters extends Component{
    constructor() {
        super();
        this.stringLetters = this.stringLetters.bind(this);
    }
    
    stringLetters() {
     return this.props.letters.join(" ").toUpperCase();   
    }
    
    render() {
        return (
            <div className="row text-center">
                <div className="col">
                    <p className="game-letters">{this.stringLetters()}</p>
                </div>
            </div>
        )
    }
}
