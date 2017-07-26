import React, {Component} from "react";
import VoteTime from "./VoteTime.js";
import VoteButton from "./VoteButton.js";

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
            <div className="col-10 main-game text-center">
                <VoteTime  />
                    <legend className="vote-for-text">Vote For Your Favorite Answer</legend>
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
                    <br />
            </div>
        )
    }
}