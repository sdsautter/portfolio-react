import React, {Component} from "react";
import GameTime from "./GameTime.js";
import GameLetters from "./GameLetters.js";
import GameInput from "./GameInput.js";
import GamePlayer from "./GamePlayer.js";


export default class SubmissionStage extends Component {
    constructor(props) {
        super(props);
        this.currentPlayers = this.currentPlayers.bind(this);
    }
    currentPlayers() {
      return this.props.players.map(player => {
            return (<GamePlayer username={player.username} points={player.points} />)
        })
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
                            {this.currentPlayers()}

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