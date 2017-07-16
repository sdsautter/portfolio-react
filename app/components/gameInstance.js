import React, {Component} from "react";
import GameTime from "./GameTime.js";
import GameLetters from "./GameLetters.js";
import GameInput from "./GameInput.js";
import GamePlayer from "./GamePlayer.js";

export default class GameInstance extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-10 main-game">
                    <div className="row">
                        <div className="col-9">
                            <GameTime />
                            <br />
                            <GameLetters />
                        </div>
                        <div className="col-3">
                            <GamePlayer />
                            <GamePlayer />
                            <GamePlayer />
                            <GamePlayer />
                        </div>
                    </div>
                    <br />
                    <GameInput />
                </div>
            </div>
        )
    }
}