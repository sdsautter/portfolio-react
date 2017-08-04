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
            timeLeft: {},
            roundNumber: {},
            votingAnswers: {},
            roundState: {},
            gameState: {},
            resultsInfo: {},
            timerId: {},
            answerSubmitted: "not yet",
            shuffledBool: false,
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
        this.addTimeLeft = this.addTimeLeft.bind(this);
        this.addRoundAnswers = this.addRoundAnswers.bind(this);
        this.addPlayers = this.addPlayers.bind(this);
        this.addGameState = this.addGameState.bind(this);
        this.setFindGameTrue = this.setFindGameTrue.bind(this);
        this.setFindGameFalse = this.setFindGameFalse.bind(this);        
        this.addResultsInfo = this.addResultsInfo.bind(this);
        this.addVotingAnswers = this.addVotingAnswers.bind(this);
        this.setAnswerSubmitted = this.setAnswerSubmitted.bind(this);
        this.setSubmittedBool = this.setSubmittedBool.bind(this);
        this.setVotedBool = this.setVotedBool.bind(this);
        this.syncClearInterval = this.syncClearInterval.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.setShuffledBoolFalse = this.setShuffledBoolFalse.bind(this);

        this.gameState = this.gameState.bind(this);
    }

    setFindGameTrue() {
        this.setState({ findGame: true });
        this.gameSync();
    }

    setFindGameFalse() {
        this.syncClearInterval();
        this.setState({ findGame: false });
    }

    syncClearInterval() {
        clearInterval(this.state.timerId);
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

    addTimeLeft(TimeLeft) {
        if (timeLeft != null ) {
        this.setState({ timeLeft });
        }
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

    addVotingAnswers(votingAnswers) {
         if (votingAnswers) {        
            if (!this.state.shuffledBool) {
                votingAnswers = this.shuffle(votingAnswers);
                this.setState({ votingAnswers });
                this.setState({ shuffledBool: true })
            }
         }
    }

    setShuffledBoolFalse() {
        this.setState({ shuffledBool: false })
    }

    //Shuffles whatever array I put into it
    shuffle(array) {
        var tmp, current, top = array.length;

        if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
        }

        return array;
    }

    addResultsInfo( resultsInfo ) {
        if (resultsInfo) {
        resultsInfo.sort((a, b) => {return b.score - a.score});    
        }    
        this.setState({ resultsInfo })
    }

    addPlayers(players) {
        players.sort((a, b) => {return b.points - a.points});
        this.setState({ players });
    }

    gameSync() {
        let isActive = true;
        if(isActive)
            {
                let timerId =  setInterval(() => {
                    gameSyncHelper(this.state.gameInstanceId, (data) => {
                        const activeRound = data.data.activeRound;
                        const gameInstanceGet = data.data.gameInstance;
                        this.addRoundLetters(activeRound.letters);
                        this.addRoundNumber(activeRound.number);
                        this.addRoundState(activeRound.state);
                        this.addRoundAnswers(activeRound.submittedAnswers);
                        if (activeRound.TimeLeft > 0) {
                        this.addTimeLeft(activeRound.stateLength);
                        }
                        this.addVotingAnswers(activeRound.userAnswers);
                        this.addResultsInfo(activeRound.userScore);
                        this.addGameState(gameInstanceGet.state);
                        this.addPlayers(gameInstanceGet.players);
                    });
                    
                }, 1000);
                this.setState({ timerId })
            }
    }

    gameState() {
        if(this.state.gameState === 'complete') {
            return (<FinalResults 
                    results={this.state.players}
                        addGameInstance={this.addGameInstance}
                        setFindGameTrue={this.setFindGameTrue}
                        findGame={this.state.findGame}
                        syncClearInterval={this.syncClearInterval}
                     />)
        } else if (this.state.findGame) {
        switch(this.state.roundState){
            case 'waiting':
                return (
                    <WaitingStage players={this.state.players} 
                        gameInstanceId={this.state.gameInstanceId}
                        setFindGameFalse={this.setFindGameFalse}
                    />
                )
                break;
            case 'voting':  
            if (this.state.votingAnswers != null) {    
                return (    
                    <VotingStage
                        roundNumber={this.state.roundNumber}
                        votingAnswers={this.state.votingAnswers}
                        voteLength={this.state.voteLength}
                        gameInstanceId={this.state.gameInstanceId}
                        setVotedBool={this.setVotedBool}
                        votedBool={this.state.votedBool}
                        timeLeft={this.state.timeLeft}  
                        setFindGameFalse={this.setFindGameFalse}
                        addTimeLeft={this.addTimeLeft}      
                        setShuffledBoolFalse={this.setShuffledBoolFalse}                                        
                    />
                )
            }
                break;

            case 'playing': 
            if (this.state.timeLeft != null) {    
                
            return (
                    <SubmissionStage 
                        roundNumber={this.state.roundNumber}                    
                        players={this.state.players} 
                        submitLength={this.state.submitLength}
                        letters={this.state.letters}
                        gameInstanceId={this.state.gameInstanceId}
                        answerSubmitted={this.state.answerSubmitted}
                        setAnswerSubmitted={this.setAnswerSubmitted}
                        setSubmittedBool={this.setSubmittedBool}
                        setFindGameFalse={this.setFindGameFalse}
                        submittedBool={this.state.submittedBool}
                        roundAnswers={this.state.roundAnswers}

                    />
                )
            }
                break;

            case 'results': 
                if (this.state.resultsInfo != null) {
                    return (
                    <ResultsStage 
                        roundNumber={this.state.roundNumber}                    
                        resultsInfo={this.state.resultsInfo}
                        setFindGameFalse={this.setFindGameFalse}
                        gameInstanceId={this.state.gameInstanceId}                         
                        />
                    )
                }
                break;

            default: 
                if (this.state.gameState === 'waiting' ){
                    return (
                        <WaitingStage 
                            players={this.state.players} 
                            setFindGameFalse={this.setFindGameFalse}
                            gameInstanceId={this.state.gameInstanceId}
                        />
                    )
                } else {
                return (
                    <FindGame 
                        addGameInstance={this.addGameInstance}
                        setFindGameTrue={this.setFindGameTrue}
                        findGame={this.state.findGame}
                     /> 
                )
                break;
        }}
    } else {
        return (<FindGame 
            addGameInstance={this.addGameInstance}
            setFindGameTrue={this.setFindGameTrue}
            findGame={this.state.findGame}
        />) 
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
