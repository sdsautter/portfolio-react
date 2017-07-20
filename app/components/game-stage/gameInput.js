import React, { Component } from "react";

export default class GameInput extends Component {
   constructor() {
       super();
       this.submitAnswer = this.submitAnswer.bind(this);
   }
    
    submitAnswer(event) {
        event.preventDefault();
        const answer = {
            answer: this.playerAnswer.value
            // player: localStorage.getItem('username'),
        }
        this.props.addAnswer(answer);
        console.log(this.playerAnswer.value);
        console.log("Answer submitted")
    }

    render() {
        return(          
            <form className="input-group" onSubmit={this.submitAnswer}>
                <input ref={(input) => {this.playerAnswer = input}} type="text" className="form-control" required placeholder="Type Answer Here" />
                    <span className="input-group-btn">
                        <button id="answerSubmit" className="btn btn-secondary" type="button">Submit!</button>
                    </span>
            </form>    
        )
    }
}