import React, {Component} from "react";
import SubmissionStage from "./game-stage/SubmissionStage.js"
import VotingStage from "./voting-stage/VotingStage.js"
import ResultsStage from "./results-stage/ResultsStage.js"
import FindGame from "./find-game-stage/FindGame.js";
import axios from "axios";

export default class GameInstance extends Component {
    constructor() {
        super();
        this.state = {
            players: {},
            gameInstance: {},
            answers: {}
        }
        this.addPlayer = this.addPlayer.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.addGameInstance = this.addGameInstance.bind(this);
        // this.findGamePost = this.findGamePost.bind(this);
    }

    addGameInstance(game) {
        // const gameInstance = {...this.state.gameInstance};
        this.setState({ gameInstance: game });
    }
    
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