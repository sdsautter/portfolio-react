import React, {Component} from "react";
import { addVote } from "../../utils/helpers.js"

export default class VoteButton extends Component {
    constructor() {
        super();
        this.postAnswer = this.postAnswer.bind(this);
    }
    
    postAnswer() {
        event.preventDefault();

        const vote = this.props.details.answer;
        return helpers.addVote(this.props.gameInstanceId, vote);     
    }
    
    render() {
        return (

            <form>
                <button name="answer" className="btn btn-warning vote-answer" onSubmit={this.postAnswer()}>{this.props.details.answer}</button>
            </form>
        )
    }
}