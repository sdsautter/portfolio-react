import React, {Component} from "react";
import VoteTime from "./VoteTime.js";
import VoteButton from "./VoteButton.js";

export default class VotingStage extends Component {
    constructor() {
        super();
    }
        
    render() {
    
        return (
            <div className="col-10 main-game text-center">
                <VoteTime timeLeft={this.props.timeLeft} />
                    <legend className="vote-for-text">Vote For Your Favorite Answer</legend>
                        <div className="btn-group-vertical" data-toggle="buttons">
                            {
                                Object.keys(this.props.votingAnswers).map((key) => {
                                    let currentAnswer = this.props.votingAnswers[key];
                                    return (<VoteButton key={key} answer={currentAnswer.answer} />)
                                })
                            }                                
                        </div>
                    <br />
            </div>
        )
    }
}