import React, {Component} from "react";
import axios from "axios";

export default class VoteButton extends Component {
    constructor() {
       super();
       this.voteAnswerPost = this.voteAnswerPost.bind(this);
   }

    voteAnswerPost(event) {
        console.log("click!"); 
        let vote = this.props.answerId;
        console.log(vote);

            axios.post(`/api/games/${this.props.gameInstanceId}`, { vote })
            .then((response) => {
                console.log("Voted");
                this.props.setVotedBool(true);
            })
            .catch(function (error) {
                console.log(error);
            });
        

    }

    render() {
        return (
            <div className="col-sm-12 col-md-8 offset-md-2 vote-answer">
                <a href="#" onClick={this.voteAnswerPost}
                    disabled={this.props.votedBool}
                    name="findGame"
                >
                    {this.props.answer}
                </a>
            </div>
        )
    }
}