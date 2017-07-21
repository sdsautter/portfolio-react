import React, {Component} from "react";
import SubmissionStage from "./game-stage/SubmissionStage.js"
import VotingStage from "./voting-stage/VotingStage.js"
import ResultsStage from "./results-stage/ResultsStage.js"
import FindGame from "./find-game-stage/FindGame.js";
import { gameSyncHelper, roundSyncHelper } from "../utils/helpers";

import axios from "axios";

export default class GameInstance extends Component {
    constructor() {
        super();
        this.state = {
            players: {},
            gameInstanceId: {},
            answers: {},
            letters: {},
            timeLeft: {}
        }
        // this.addPlayer = this.addPlayer.bind(this);
        // this.addAnswer = this.addAnswer.bind(this);
        this.addGameInstance = this.addGameInstance.bind(this);
        this.addLetters = this.addLetters.bind(this);        
        this.gameSync = this.gameSync.bind(this);
        this.roundSync = this.roundSync.bind(this);
        // this.findGamePost = this.findGamePost.bind(this);
    }

    addGameInstance(gameInstanceId) {
        // const gameInstance = {...this.state.gameInstance};
        this.setState({ gameInstanceId });
    }

    addLetters(letters) {
        // const gameInstance = {...this.state.gameInstance};
        this.setState({ letters });
    }

    addTimeLeft(timeLeft) {
        // const gameInstance = {...this.state.gameInstance};
        this.setState({ timeLeft });
    }
/*    
    addPlayer(player) {
        const players = {...this.state.players};
        const timestamp = Date.now();
        players[`player-${timestamp}`] = player;
        this.setState({ players })
    }

    addAnswer(answer) {
        const answers = { ...this.state.answers};
        
        //Uses time stamp to get a unique ID. Can probably figure out a better way
        const timestamp = Date.now();
        answers[`answer-${timestamp}`] = answer;
        this.setState({ answers })
    }
*/
    gameSync() {
        let isActive = true;
        if(isActive)
            {
                window.setInterval(() => {
                    console.log("game");
                    gameSyncHelper((data) => {
                        
                        let roundIndex = data.data.length - 1;                        
                        console.log(data.data[roundIndex]);
                    });
                    this.gameSync;
                }, 1000);
            }
    }

    roundSync() {
        let isActive = true;
        if(isActive)
            {
                
                window.setInterval(() => {
                    roundSyncHelper((data) => {
                    console.log("round");
                        let roundIndex = data.data.length - 1;                        
                        console.log(data.data[roundIndex]);
                        this.addLetters(data.data[roundIndex].letters);
                    });
                    this.roundSync;
                }, 1000);
            }
    }
    // findGamePost(event) {
    //     event.preventDefault();
    //     axios.post("/api/games", {})
    //         .then(function (response) {
    //             const gameInstance = {...this.state.gameInstance};

    //             console.log("hello");
    //             this.setState({ gameInstance })
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    
    render() {
        this.gameSync();
        this.roundSync();

        return (
            <div className="row justify-content-center">

                <FindGame 
                addGameInstance={this.addGameInstance}
                
                    // findGamePost={this.findGamePost}
                />                
                {/*<SubmissionStage 
                    players={this.state.players} 
                    addAnswer={this.addAnswer}
                />*/}
                {/*<VotingStage />*/}
                {/*<ResultsStage />*/}
            </div>
        )
    }
}