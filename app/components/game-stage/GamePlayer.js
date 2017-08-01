import React, { Component } from "react";

export default class GamePlayer extends Component {
    
    constructor() {
        super();
    }


    render() {     

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