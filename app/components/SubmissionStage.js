import React, {Component} from "react";
import GameTime from "./GameTime.js";
import GameLetters from "./GameLetters.js";
import GameInput from "./GameInput.js";
import GamePlayer from "./GamePlayer.js";

export default class SubmissionStage extends Component {
    render() {
        return (
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
                    <div class="row">
                        <div class="col">
                            <GameInput />
                        </div>
                    </div>
                </div>
        )
    }
}