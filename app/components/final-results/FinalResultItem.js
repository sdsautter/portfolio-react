import React, {Component} from "react";

export default class FinalResultsItem extends Component {
    render() {
        return (
            <div className="row results-all">
                    <div className="col-2">
                        <img className="avatar-results" src="assets/images/avatar1.svg" />
                    </div>
                    <div className="col-10">
                        <div className="row">

                            <div className="col">
                                <p className="player-name">{this.props.username}</p>
                            </div>

                            <div className="col">
                                <p>Points:</p>
                            </div>
                            <div className="col-1">
                                <p>{this.props.score}</p>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}