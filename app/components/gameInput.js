import React, { Component } from "react";

export default class GameInput extends Component {
    render() {
        return(          
            <div className="input-group">
                <input id="playerAnswer" type="text" className="form-control" placeholder="Type Here" />
                    <span className="input-group-btn">
                        <button id="answerSubmit" className="btn btn-secondary" type="button">Submit!</button>
                    </span>
            </div>    
        )
    }
}