import React, {Component} from "react";
import ResultItem from "./ResultItem.js";

export default class ResultsStage extends Component {
    render() {
        return (
            <div className="col-10 main-game text-center">

            {
                Object.keys(this.props.resultsInfo).map((key) => {
                    let resultsInfo = this.props.resultsInfo[key];
                    return (<ResultItem
                        answer={resultsInfo.answer} 
                        userScore={resultsInfo.userScoreForRound} 
                        username={resultsInfo.username} 
                        />)
                    })
                }
            }
                {/*<ResultItem answer="Ginger Under Burns" username="Scott" votes="3" points="1000" />
                <ResultItem answer="Gutter Utter Butter" username="Phil" votes="0" points="0" />
                <ResultItem answer="Get Used Bitches" username="Byron" votes="1" points="150" />
                <ResultItem answer="Gentrifcation Usually Betters" username="Tolu" votes="0" points="0" />*/}                
            </div>
        )
    }
}