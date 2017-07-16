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
                                <p className="results-answer">Gather Under Bushes</p>
                            </div>
                            <div className="col">
                                <p className="player-name">Scott</p>
                            </div>
                            <div className="col-1">
                                <p>Votes:</p>
                            </div>
                            <div className="col-1">
                                <p>3</p>
                            </div>
                            <div className="col-2">
                                <p>Time Left:</p>
                            </div>
                            <div className="col-1">
                                <p>59</p>
                            </div>
                            <div className="col">
                                <p>Points:</p>
                            </div>
                            <div className="col-1">
                                <p>3562</p>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}