import React, { Component } from "react";
import axios from "axios";
import { addAnswer } from "../../utils/helpers";

export default class GameInput extends Component {
   constructor() {
       super();
       this.submitAnswer = this.submitAnswer.bind(this);
   }
    
    submitAnswer(event) {
        event.preventDefault();
        
        const answer = this.playerAnswer.value.trim();
        const lettersArray = this.props.letters;

        axios.post(`/api/games/${this.props.gameInstanceId}`, { answer })
            .then((response) => {
                console.log(`answer submitted - server response: ${JSON.stringify(response.data)}`);
                //Will be true if answer is invalid
                if (JSON.stringify(response.data).includes("Invalid") ) {
                    this.props.setAnswerSubmitted("Invalid");
                } else if (JSON.stringify(response.data).includes("Success")) {
                    this.props.setAnswerSubmitted("Success");
                    this.props.setSubmittedBool(true);
                } else if (JSON.stringify(response.data).includes("submitted")) {
                    this.props.setAnswerSubmitted("submitted");          
                }
                
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let alreadyAnswered = false;

        return(          
            <form className="input-group" onSubmit={this.submitAnswer}>
                <input 
                    ref={(input) => {this.playerAnswer = input}}
                    name="answer"
                    disabled={this.props.submittedBool} 
                    type="text" 
                    className="form-control" 
                    required placeholder="Type Answer Here" 
                />
                    <span className="input-group-btn">
                        <button 
                        id="answerSubmit" 
                        className="btn btn-sm btn-secondary"
                        disabled={this.props.submittedBool}                      
                        type="submit">
                            Submit!
                        </button>
                    </span>
            </form>    
        )
    }
}