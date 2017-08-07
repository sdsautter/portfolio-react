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
            <form onSubmit={this.submitAnswer}>
                <div className="row">
                    <div className="col-12 col-lg-10 answer-input">
                        <input 
                            ref={(input) => {this.playerAnswer = input}}
                            name="answer"
                            disabled={this.props.submittedBool} 
                            type="text" 
                            required placeholder="Type Answer Here" 
                        />
                    </div>
                    <div className="col col-lg-2 text-right">
                        <button 
                        id="answerSubmit" 
                        className="btn btn-sm btn-secondary"
                        disabled={this.props.submittedBool}                      
                        type="submit">
                            Submit!
                        </button>
                    </div>
                </div>
            </form>    
        )
    }
}