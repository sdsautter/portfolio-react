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
                            <GameTime timeLeft="60"/>
                            <br />
                            <GameLetters letters="GUB"/>
                        </div>
                        <div className="col-3">

                        
                            <GamePlayer username="Scott" points="1337"/>
                            <GamePlayer username="Phil" points="666"/>
                            <GamePlayer username="Tolu" points="420"/>
                            <GamePlayer username="Byron" points="69"/>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">

                            <GameInput />
                        </div>
                    </div>
                </div>
        )
    }
}