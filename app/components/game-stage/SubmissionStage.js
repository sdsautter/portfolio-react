import React, {Component} from "react";
import GameTime from "./GameTime.js";
import GameLetters from "./GameLetters.js";
import GameInput from "./GameInput.js";
import GamePlayer from "./GamePlayer.js";


export default class SubmissionStage extends Component {
    constructor(props) {
        super(props);
        this.inputRender = this.inputRender.bind(this);
    }

    componentWillMount() {
        this.props.setAnswerSubmitted("not yet");
        this.props.setSubmittedBool(false);
    }

    inputRender() {
        switch (this.props.answerSubmitted) {
            case "not yet": {
                return(
                    
                        <div className="col">
                            <p className="p-make">Make an acronym with the above letters</p>
                        </div>                        
                    
                )
                break;
            }

            case "Invalid": {
                return(
                    
                        <div className="col">
                            <p className="p-invalid">Your answer wasn't valid. Try harder.</p>
                        </div>                        
                    
                )
                break;
            }

            case "Success": {
                return(
                    
                        <div className="col">
                            <p className="p-success">Hey, way to make an answer!</p>
                        </div>                        
                    
                )
                break;
            }

            case "submitted": {
                return(
                    
                        <div className="col">
                            <p className="p-submitted">You've already answered...</p>
                        </div>                        
                    
                )
                break;
            }

            default: {
                return(
                    
                        <div className="col">
                            <p className="p-make">Make an acronym with the above letters</p>
                        </div>                     
                    
                )
                break;
            }

        }
    }
    
    render() {
        return (
                <div className="col-sm-12 col-md-10 main-game">
                    <div className="row">
                        <div className="col-sm-12 col-md-9">
                            <GameTime 

                            />
                            <br />
                            <GameLetters letters={this.props.letters}/>
                            <div className="row">
                            <div className="col-12">
                            <GameInput 
                                letters={this.props.letters}
                                gameInstanceId={this.props.gameInstanceId}
                                setAnswerSubmitted={this.props.setAnswerSubmitted}
                                setSubmittedBool={this.props.setSubmittedBool}
                                submittedBool={this.props.submittedBool}
                            />
                            </div>
                    {this.inputRender()}
                            
                        </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            {
                                Object.keys(this.props.players).map((key) => {
                                    var currentPlayer = this.props.players[key];
                                    return (<GamePlayer key={key} username={currentPlayer.username} points={currentPlayer.points} />)
                                })    
                            }   
                        </div>
                    </div>
                    <br />
                    {/*<div className="row">
                        <div className="col">
                            <GameInput 
                                letters={this.props.letters}
                                gameInstanceId={this.props.gameInstanceId}
                                setAnswerSubmitted={this.props.setAnswerSubmitted}
                                setSubmittedBool={this.props.setSubmittedBool}
                                submittedBool={this.props.submittedBool}
                            />
                        </div>
                    </div>*/}
                </div>
        )
    }
}