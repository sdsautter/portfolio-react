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
            roundAnswers: {},
            letters: {},
            timeLeft: {},
            roundNumber: {},
            votingAnswers: {},
            roundState: {},
            gameState: {}
        }

        this.addGameInstance = this.addGameInstance.bind(this);
        this.addRoundLetters = this.addRoundLetters.bind(this);  
        this.addRoundNumber = this.addRoundNumber.bind(this);        
        this.addRoundState = this.addRoundState.bind(this);  
        this.addRoundTimeLeft = this.addRoundTimeLeft.bind(this);
        this.addRoundAnswers = this.addRoundAnswers.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.addGameState = this.addGameState.bind(this);
    }

    addGameInstance(gameInstanceId) {
        this.setState({ gameInstanceId });
    }

    addGameState(gameState) {
        this.setState({ gameState });
    }

    addRoundNumber(roundNumber) {
        this.setState({ roundNumber });
    }

    addRoundTimeLeft(roundTimeLeft) {
        this.setState({ roundTimeLeft });
    }

    addRoundState(roundState) {
        this.setState({ roundState });
    }


    addRoundAnswers(roundAnswers) {
        this.setState({ roundAnswers });
    }


    addRoundState(roundState) {
        this.setState({ roundState });
    }

    addRoundLetters(letters) {
        this.setState({ letters });
    }

    addTimeLeft(timeLeft) {
        this.setState({ timeLeft });
    }

    addVotingAnswers(votingAnswers) {
        this.setState({ votingAnswers });
    }

    addPlayers(players) {
        this.setState({ players });
    }

    gameSync() {
        let isActive = true;
        if(isActive)
            {
                window.setInterval(() => {
                    gameSyncHelper(this.state.gameInstanceId, (data) => {
                        const activeRound = data.data.activeRound;
                        const gameInstanceGet = data.data.gameInstance;
                            
                        this.addRoundLetters(activeRound.letters);
                        this.addRoundNumber(activeRound.number);
                        this.addRoundState(activeRound.state);
                        this.addRoundAnswers(activeRound.submittedAnswers);
                        this.addRoundTimeLeft(activeRound.timeLeft);
                        this.addVotingAnswers(activeRound.userAnswers);
                        this.addGameState(gameInstanceGet.state);
                        this.addPlayers(gameInstanceGet.players);
                    });
                    this.gameSync;
                }, 1000);
            }
    }

    render() {
        return (
            <div className="row justify-content-center">
                  <FindGame addGameInstance={this.addGameInstance} />
                  {/*<SubmissionStage 
                    players={this.state.players} 
                    timeLeft={this.state.timeLeft}
                    letters={this.state.letters}
                    roundNumber={this.state.roundNumber}
                    />
                    <VotingStage
                    answers={this.state.votingAnswers}
                    />
                    <ResultsStage 
                    />*/}
            </div>
        )
    }
}