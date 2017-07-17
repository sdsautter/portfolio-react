import React, {Component} from "react";

export default class VoteButton extends Component {
    render() {
        return (

            <form action="" method="post">
                <button name="answer" className="btn btn-warning vote-answer" value="">{this.props.answer}</button>
            </form>
        )
    }
}