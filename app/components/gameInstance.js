import React, {Component} from "react";
import SubmissionStage from "./game-stage/SubmissionStage.js";
import VotingStage from "./voting-stage/VotingStage.js";
import ResultsStage from "./results-stage/ResultsStage.js";
import FindGame from "./find-game-stage/FindGame.js";
import WaitingStage from "./waiting-stage/GameWaiting.js";
import FinalResults from "./final-results/FinalResultsStage";
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
            answerSubmitted: "not yet",
            submittedBool: false,
            votedBool: false,
            findGame: false
        }
    // const io = require('socket.io-client');
    // const socket = io.connect('http://localhost')
    // //When component is mounted. This is technically when a user "connects" to game server.
    // componentDidMount(){
    //     //Customer even Welcome from server. On represents a listen port to receive an event. 
    //     //With Data being param sent from server. In this case a string "Welcome user"
    //     socket.on('welcome', function(data){
    //         console.log(data);
    //         //Client emits a custom 'return' event to confirm receipt.
    //         //sends an example JSON object "Thanks" that will print to server console.
    //         //the JSON object can be compiled inline or elsewhere, or be any variable from within the component. 
    //         socket.emit('return', {my:'thanks'});
    //     });

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
        this.addVotingAnswers = this.addVotingAnswers.bind(this);
        this.setAnswerSubmitted = this.setAnswerSubmitted.bind(this);
        this.setSubmittedBool = this.setSubmittedBool.bind(this);
        this.setVotedBool = this.setVotedBool.bind(this);


        this.gameState = this.gameState.bind(this);
    }

    addFindGame() {
        this.setState({ findGame: true });
        this.gameSync();
    }

    setSubmittedBool(submittedBool) {
        this.setState({ submittedBool });
    }

    setAnswerSubmitted(answerSubmitted) {
        this.setState({ answerSubmitted });
    }

    setVotedBool(votedBool) {
        this.setState({ votedBool });
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
        if(this.state.gameState === 'complete') {
            return (<FinalResults 
                    results={this.state.players}
                     />)
        } else {
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
                        setVotedBool={this.setVotedBool}
                        votedBool={this.state.votedBool}
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
                        answerSubmitted={this.state.answerSubmitted}
                        setAnswerSubmitted={this.setAnswerSubmitted}
                        setSubmittedBool={this.setSubmittedBool}
                        submittedBool={this.state.submittedBool}
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
    }

    render() {
        return (
            <div className="row justify-content-center">
                  {this.gameState()}
            </div>
        )
    }
}
