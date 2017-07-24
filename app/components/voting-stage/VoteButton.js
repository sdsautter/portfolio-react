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


            
                <button onClick={this.voteAnswerPost}
                    disabled={this.props.votedBool}
                    name="findGame"
                    className="btn btn-success vote-answer"
                >
                    {this.props.answer}
                </button>
            


            // <form onSubmit={this.voteAnswerPost}>
            //     <input name="findGame" type="submit" value={this.props.answer} />
            // </form>

           
        )
    }
}