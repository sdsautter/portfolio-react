import React, { Component } from "react";

export default class GamePlayer extends Component {
    
    constructor() {
        super();
    
        this.renderRowClass = this.renderRowClass.bind(this);
        this.submissionCheck = this.submissionCheck.bind(this);
    }

    submissionCheck() {
        if (this.props.roundAnswers) {
            const roundAnswers = this.props.roundAnswers;
            let answerSubmitted = false;

            for (var i = 0; i < roundAnswers.length; i++) {
                if (roundAnswers[i].username === this.props.username) {
                    answerSubmitted = true}
            }
            if (answerSubmitted) {return(
                <div className="row player-info answer-submitted">
                    <div className="col-3 align-self-center">
                        <img className="avatar" src="assets/images/avatar1.svg" />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-12 text-left align-self-center player-name">
                                {this.props.username}
                            </div>
                            <div className="col-5 points-text">
                                Points:
                            </div>
                            <div className="col-7 player-points">
                            {this.props.points}
                            </div>
                        </div>
                    </div>
                </div>

            )} else{return(
                <div className="row player-info">
                    <div className="col-3 align-self-center">
                        <img className="avatar" src="assets/images/avatar1.svg" />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-12 text-left align-self-center player-name">
                                {this.props.username}
                            </div>
                            <div className="col-5 points-text">
                                Points:
                            </div>
                            <div className="col-7 player-points">
                            {this.props.points}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        } else {
            return (
                <div className="row player-info">
                    <div className="col-3 align-self-center">
                        <img className="avatar" src="assets/images/avatar1.svg" />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-12 text-left align-self-center player-name">
                                {this.props.username}
                            </div>
                            <div className="col-5 points-text">
                                Points:
                            </div>
                            <div className="col-7 player-points">
                            {this.props.points}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderRowClass() {
        this.submissionCheck();
        if (!this.state.answerSubmitted) {
            return(
            <div className="row player-info">
                <div className="col-3 align-self-center">
                    <img className="avatar" src="assets/images/avatar1.svg" />
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-12 text-left align-self-center player-name">
                            {this.props.username}
                        </div>
                        <div className="col-sm-5 col-md-3 col-lg-5 points-text">
                            Points:
                        </div>
                        <div className="col-sm-7 col-md-9 col-lg-7 player-points">
                        {this.props.points}
                        </div>
                    </div>
                </div>
            </div>
            )} else {
            return(
            <div className="row player-info answer-submitted">
                <div className="col-3 align-self-center">
                    <img className="avatar" src="assets/images/avatar1.svg" />
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-12 text-left align-self-center player-name">
                            {this.props.username}
                        </div>
                        <div className="col-sm-5 col-md-3 col-lg-5 points-text">
                            Points:
                        </div>
                        <div className="col-sm-7 col-md-9 col-lg-7 player-points">
                        {this.props.points}
                        </div>
                    </div>
                </div>
            </div>);
        }
    }
    
    render() {     

        return(
            <span>
                {this.submissionCheck()}
            </span>
        )
    }
}