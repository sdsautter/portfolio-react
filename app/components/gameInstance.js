import React, {Component} from "react";
import SubmissionStage from "./game-stage/SubmissionStage.js"
import VotingStage from "./voting-stage/VotingStage.js"
import ResultsStage from "./results-stage/ResultsStage.js"


export default class GameInstance extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <SubmissionStage />
                {/*<VotingStage />*/}
                {/*<ResultsStage />*/}
            </div>
        )
    }
}