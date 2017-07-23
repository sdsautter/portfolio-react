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
            })
            .catch(function (error) {
                console.log(error);
            });

        // var answerArray = answer.split(" ");
        // console.log(answerArray);
        // console.log(lettersArray);
        // console.log(addAnswer(this.props.gameInstance));
        // //First we'll see if there's any time left
        // if (this.props.timeLeft > 0  && !alreadyAnswered) {
        //     //We check to see if the answer array is the same length as the letter array
        //     if (answerArray.length === letterArray.length) {
        //         //If it is the same length then we run a for loop that is the length of the letter array
        //         for (var i = 0; i < letterArray.length; i++) {
        //             //If the first letter in the player's answer starts with the corresponding, we push that answer to the database
        //             if (answerArray[i].startsWith(letterArray[i])) {
        //                 //Run the score potential function first
        //                 // scorePotential(roundNumber, timeLeft);
        //                 alreadyAnswered = true;

        //                 return helpers.addAnswer(this.props.gameInstanceId, answer);
        //             } else {
        //                 //If a letter doesn't start with the corresponding letter in array, return
        //                 return alert(`Word ${i + 1} did not start with the corret letter`);
        //             }
        //         }
        //     } else if (answerArray.length > letterArray.length) {
        //         alert("You have too many words. What are you trying to pull?");
        //         return;
        //     } else if (answerArray.length < letterArray.length) {
        //         alert("You don't have enough words. What are you thinking?");
        //         return;
        //     }
        // }
    }

    render() {
        let alreadyAnswered = false;

        return(          
            <form className="input-group" onSubmit={this.submitAnswer}>
                <input 
                    ref={(input) => {this.playerAnswer = input}}
                    name="answer" 
                    type="text" 
                    className="form-control" 
                    required placeholder="Type Answer Here" 
                />
                <input 
                    type="hidden" 
                    name="playerId" 
                    //We'll have to pull local player for this value
                    value=""
                />
                    <span className="input-group-btn">
                        <button id="answerSubmit" className="btn btn-secondary" type="button">Submit!</button>
                    </span>
            </form>    
        )
    }
}