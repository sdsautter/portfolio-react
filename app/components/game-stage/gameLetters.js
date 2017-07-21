import React, {Component} from "react";

export default class GameLetters extends Component{
    constructor() {
        super();
        this.stringLetters = this.stringLetters.bind(this);
    }
    
    stringLetters() {
     return this.props.letters.join(" ");   
    }
    
    render() {
        return (
            <div className="row text-center">
                <div className="col-6 offset-4">
                    <p className="game-letters">{this.stringLetters}</p>
                </div>
            </div>
        )
    }
}
