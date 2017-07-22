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
            roundTimeLeft: 61,
            roundNumber: {},
            votingAnswers: {},
            roundState: {},
            gameState: {},
            resultsInfo: {},
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
        this.addResultsInfo = this.addResultsInfo.bind(this);
        this.addVotingAnswers = this.addVotingAnswers.bind(this)

        //Binding Game Renders
        // this.findGameRender = this.findGameRender.bind(this);
        // this.waitingStageRender = this.waitingStageRender.bind(this);
        // this.submissionStageRender = this.submissionStageRender.bind(this);
        // this.votingStageRender = this.votingStageRender.bind(this);
        // this.resultsStageRender = this.resultsStageRender.bind(this);
        // this.endResultsRender = this.endResultsRender.bind(this);
        this.gameState = this.gameState.bind(this);
    }

    addFindGame() {
        this.setState({ findGame: true });
        this.gameSync();
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

    addResultsInfo( resultsInfo ) {
        this.setState({ resultsInfo })
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
                        this.addResultsInfo(activeRound.userScore);
                        this.addGameState(gameInstanceGet.state);
                        this.addPlayers(gameInstanceGet.players);
                        
                    });
                    
                }, 1000);
            }
    }

    gameState() {
        switch(this.state.roundState){
            case 'waiting':
                return (
                    <WaitingStage players={this.state.players} />
                )
                break;
            case 'voting': 
            if (this.state.votingAnswers != null) {    
                return (    
                    <VotingStage
                        votingAnswers={this.state.votingAnswers}
                        timeLeft={this.state.roundTimeLeft}
                        gameInstanceId={this.state.gameInstanceId}
                    />
                )
            }
                break;

            case 'playing': 
                return (
                    <SubmissionStage 
                        players={this.state.players} 
                        timeLeft={this.state.roundTimeLeft}
                        letters={this.state.letters}
                        roundNumber={this.state.roundNumber}
                        gameInstanceId={this.state.gameInstanceId}
                    />
                )
                break;

            case 'results': 
                if (this.state.resultsInfo != null) {
                    return (
                    <ResultsStage 
                            resultsInfo={this.state.resultsInfo}
                        />
                    )
                }
                break;

            default: 
                if (this.state.gameState === 'waiting' ){
                        return (
                            <WaitingStage players={this.state.players} />
                        )
                }else {
                return (
                    <FindGame 
                        addGameInstance={this.addGameInstance}
                        addFindGame={this.addFindGame}
                     /> 
                )
                break;
        }}
    }

    render() {
        return (
            <div className="row justify-content-center">
                  {this.gameState()}
            </div>
        )
    }
}