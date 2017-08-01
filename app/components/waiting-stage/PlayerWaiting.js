import React, { Component } from "react";

export default class GamePlayer extends Component {
    
    constructor() {
        super();
    }


    render() {     

        return(
            <div className="row waiting-player">
                <div className="col-3 align-self-center">
                    <img className="avatar" src="assets/images/avatar1.svg" />
                </div>
                <div className="col-9 align-self-center text-left">
                        <p className="waiting-name">{this.props.username}</p>
                </div>
            </div>
        )
    }
}