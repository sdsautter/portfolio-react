import React, {Component} from "react";
import SubmissionStage from "./game-stage/SubmissionStage.js"
import VotingStage from "./voting-stage/VotingStage.js"
import ResultsStage from "./results-stage/ResultsStage.js"
import FindGame from "./find-game-stage/FindGame.js";
import WaitingStage from "./waiting-stage/GameWaiting.js";
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
            timeLeft: 61,
            roundNumber: {},
            votingAnswers: {},
            roundState: {},
            gameState: {},
            findGame: false
        }

        //Binding functions to change the states
        this.addGameInstance = this.addGameInstance.bind(this);
        this.addRoundLetters = this.addRoundLetters.bind(this);  
        this.addRoundNumber = this.addRoundNumber.bind(this);        
        this.addRoundState = this.addRoundState.bind(this);  
        this.addRoundTimeLeft = this.addRoundTimeLeft.bind(this);
        this.addRoundAnswers = this.addRoundAnswers.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.addGameState = this.addGameState.bind(this);
        this.addFindGame = this.addFindGame.bind(this);

        //Binding Game Renders
        this.findGameRender = this.findGameRender.bind(this);
        this.waitingStageRender = this.waitingStageRender.bind(this);
        this.submissionStageRender = this.submissionStageRender.bind(this);
        this.votingStageRender = this.votingStageRender.bind(this);
        this.resultsStageRender = this.resultsStageRender.bind(this);
        this.endResultsRender = this.endResultsRender.bind(this);
    }

    addFindGame() {
        this.setState({ findGame: true });
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
                        console.log(activeRound);  
                        this.addRoundLetters(activeRound.letters);
                        this.addRoundNumber(activeRound.number);
                        this.addRoundState(activeRound.state);
                        this.addRoundAnswers(activeRound.submittedAnswers);
                        this.addRoundTimeLeft(activeRound.timeLeft);
                        this.addVotingAnswers(activeRound.userAnswers);
                        this.addGameState(gameInstanceGet.state);
                        this.addPlayers(gameInstanceGet.players);
                    });
                    this.gameSync();
                }, 2500);
            }
    }

    findGameRender() {
        if (!this.state.findGame) {
            return (
                <FindGame 
                    addGameInstance={this.addGameInstance}
                    addFindGame={this.addFindGame}
                 /> 
            )
        }
    }

    waitingStageRender() {
        if (this.state.gameState === 'waiting') {
            return (
                <WaitingStage players={this.state.players} />
            )
        }
    }

    submissionStageRender() {
        if (this.state.roundState === 'playing') {
            return (
                <SubmissionStage 
                    players={this.state.players} 
                    timeLeft={this.state.timeLeft}
                    letters={this.state.letters}
                    roundNumber={this.state.roundNumber}
                    />
            )
        }
    }

    votingStageRender() {
        if (this.state.roundState === 'voting') {
            return (
                <VotingStage
                    answers={this.state.votingAnswers}
                    />
            )
        }
    }

    resultsStageRender() {
        if (this.state.roundState === 'results') {
            return (
                <ResultsStage 
                    />
            )
        }
    }

    endResultsRender() {
        
    }

    render() {
        this.gameSync();
        return (
            <div className="row justify-content-center">
                  {this.findGameRender()} 
                  {this.waitingStageRender()}
                  {this.submissionStageRender()}
                  {this.votingStageRender()}
                  {this.resultsStageRender()}
            {/*
                 
                    <WaitingStage players={this.state.players} />

                    <SubmissionStage 
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
