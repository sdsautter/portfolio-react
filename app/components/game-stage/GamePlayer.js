import React, { Component } from "react";

export default class GamePlayer extends Component {
    
    constructor() {
        super();
    }

    render() {     

        return(
            <div className="row player-info">
                <div className="col-4 align-self-center">
                    <img className="avatar" src="assets/images/avatar1.png" />
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">
                        {this.props.username}
                        </div>
                        <div className="col-5">
                            <p className="points-text">Points:</p>
                        </div>
                        <div className="col-7">
                        {this.props.points}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}