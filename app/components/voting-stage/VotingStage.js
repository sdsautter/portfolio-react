import React, {Component} from "react";
import VoteTime from "./VoteTime.js";
import VoteButton from "./VoteButton.js";

export default class VotingStage extends Component {
    render() {
    
        return (
            <div className="col-10 main-game text-center">
                <VoteTime timeLeft={this.props.timeLeft} />
                    <legend className="vote-for-text">Vote For Your Favorite Answer</legend>
                        <div className="btn-group-vertical" data-toggle="buttons">
                            {console.log(this.props.votingAnswers)} 
                            {
                                Object.keys(this.props.votingAnswers).map((key) => {
                                    let currentAnswer = this.props.votingAnswers[key];
                                    return (<VoteButton answer={currentAnswer.answer} />)
                                })
                            }                                
                            
                            {/*<VoteButton answer="Gentrifcation Usually Betters"/>
                            <VoteButton answer="Ginger Ultra Burn" />
                            <VoteButton answer="Google Underwear Brown" />*/}
                        </div>
                    <br />
            </div>
        )
    }
}