import React, {Component} from "react";
import ResultItem from "./ResultItem.js";
import LeaveButton from "../LeaveButton.js";
import RoundNumber from "../RoundNumber.js";

export default class ResultsStage extends Component {
    render() {
        return (
            <div className="col-11 main-game text-center">
                <div className="row justify-content-between">
                    <LeaveButton 
                        gameInstanceId={this.props.gameInstanceId}                        setFindGameFalse={this.props.setFindGameFalse}
                        setFindGameFalse={this.props.setFindGameFalse}
                    />
                    <RoundNumber roundNumber={this.props.roundNumber} />
                </div>
                <div className="row text-center">
                    <div className="col">
                        <h1 className="round-header">Round Results</h1>
                    </div>
                </div>
            {
                Object.keys(this.props.resultsInfo).map((key) => {
                    let resultsInfo = this.props.resultsInfo[key];
                    return (<ResultItem
                        // answer={resultsInfo.answer}
                        key={key} 
                        score={resultsInfo.score} 
                        username={resultsInfo.username} 
                        />)
                    })
            }
                {/*<ResultItem answer="Ginger Under Burns" username="Scott" votes="3" points="1000" />
                <ResultItem answer="Gutter Utter Butter" username="Phil" votes="0" points="0" />
                <ResultItem answer="Get Used Bitches" username="Byron" votes="1" points="150" />
                <ResultItem answer="Gentrifcation Usually Betters" username="Tolu" votes="0" points="0" />*/}                
            </div>
        )
    }
}