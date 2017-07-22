import React, {Component} from "react";
import GameTime from "./GameTime.js";
import GameLetters from "./GameLetters.js";
import GameInput from "./GameInput.js";
import GamePlayer from "./GamePlayer.js";


export default class SubmissionStage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
                <div className="col-10 main-game">
                    <div className="row">
                        <div className="col-9">
                            <GameTime timeLeft={this.props.timeLeft}/>
                            <br />
                            <GameLetters letters={this.props.letters}/>
                        </div>
                        <div className="col-3">
                            {
                                Object.keys(this.props.players).map((key) => {
                                var currentPlayer = this.props.players[key];
                                return (<GamePlayer username={currentPlayer.username} points={currentPlayer.points} />)
                                })
                            }
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">

                            <GameInput letters={this.props.letters}/>
                        </div>
                    </div>
                </div>
        )
    }
}