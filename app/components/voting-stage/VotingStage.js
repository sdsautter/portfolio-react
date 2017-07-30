import React, {Component} from "react";
import VoteTime from "./VoteTime.js";
import VoteButton from "./VoteButton.js";
import LeaveButton from "../LeaveButton.js";
import RoundNumber from "../RoundNumber.js";

export default class VotingStage extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.setVotedBool(false);
    }
        
    voteAnswerPost(event) {
        console.log("click!"); 
        let vote = this.props.answerId;

            // axios.post(`/api/games/${this.props.gameInstanceId}`, { vote })
            // .then((response) => {
            //     console.log("Voted");
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        

    }
        
    render() {
    
        return (
            <div className="col-11 main-game text-center">
                <div className="row justify-content-between">
                    <LeaveButton 
                        gameInstanceId={this.props.gameInstanceId} 
                        setFindGameFalse={this.props.setFindGameFalse}
                    />
                    <RoundNumber roundNumber={this.props.roundNumber} />
                </div>                
                <VoteTime  />
                    <legend className="vote-for-text">Vote For Your Favorite Answer</legend>
                    <div className="row text-center">
                    <div className="col-12">
                        <div className="btn-group-vertical" data-toggle="buttons">
                            {
                                Object.keys(this.props.votingAnswers).map((key) => {
                                    let currentAnswer = this.props.votingAnswers[key];
                                    return (<VoteButton 
                                        key={key} 
                                        answer={currentAnswer.answer}
                                        answerId={currentAnswer.answerId}
                                        gameInstanceId={this.props.gameInstanceId}
                                        setVotedBool={this.props.setVotedBool}
                                        votedBool={this.props.votedBool} 
                                    />)
                                })
                            }                                
                        </div>
                    </div>
                    </div>
                    <br />
            </div>
        )
    }
}