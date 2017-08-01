import React, {Component} from "react";

export default class ResultsItem extends Component {
    render() {
        return (
                <div className="col-sm-12 col-md-4 offset-md-4 results-all">
                    <div className="row">
                    <div className="col-3 align-self-center">
                        <img className="avatar-results" src="assets/images/avatar1.svg" />
                    </div>
                    <div className="col-9">
                        <div className="row text-left">
                            <div className="col-12 text-left align-self-center player-name">
                                {this.props.username}
                            </div>
                            <div className="col-5 points-text">
                                Points:
                            </div>
                            <div className="col-7 player-points">
                                {this.props.score}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        )
    }
}