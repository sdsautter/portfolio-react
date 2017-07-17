import React, {Component} from "react";

export default class ResultsItem extends Component {
    render() {
        return (
            <div className="row results-all">
                    <div className="col-2">
                        <img className="avatar-results" src="assets/images/avatar1.png" />
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-12">
                                <p className="results-answer">{this.props.answer}</p>
                            </div>
                            <div className="col">
                                <p className="player-name">{this.props.username}</p>
                            </div>
                            <div className="col-1">
                                <p>Votes:</p>
                            </div>
                            <div className="col-1">
                                <p>{this.props.votes}</p>
                            </div>
                            <div className="col-2">
                                <p>Time Left:</p>
                            </div>
                            <div className="col-1">
                                <p>{this.props.timeLeft}</p>
                            </div>
                            <div className="col">
                                <p>Points:</p>
                            </div>
                            <div className="col-1">
                                <p>{this.props.points}</p>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}