import React, {Component} from "react";
import SubmissionStage from "./SubmissionStage.js"
import VotingStage from "./VotingStage.js"
import ResultsStage from "./ResultsStage.js"


export default class GameInstance extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                {/*<SubmissionStage />*/}
                {/*<VotingStage />*/}
                <ResultsStage />
            </div>
        )
    }
}