import React, {Component} from "react";

export default class VoteButton extends Component {
    constructor() {
       super();
       this.voteAnswerPost = this.voteAnswerPost.bind(this);
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


            <form onSubmit={this.voteAnswerPost}>
                <button 
                    name="findGame"
                    className="btn btn-success vote-answer"
                >
                    {this.props.answer}
                </button>
            </form>


            // <form onSubmit={this.voteAnswerPost}>
            //     <input name="findGame" type="submit" value={this.props.answer} />
            // </form>

           
        )
    }
}