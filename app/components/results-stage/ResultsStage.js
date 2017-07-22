import React, {Component} from "react";
import ResultItem from "./ResultItem.js";

export default class ResultsStage extends Component {
    render() {
        return (
            <div className="col-10 main-game text-center">

            {/* THIS INFO WILL NEED TO BE UPDATED WITH WHAT WE ACTUALLY GET
                Object.keys(this.props.votingAnswers).map((key) => {
                    let currentAnswer = this.props.votingAnswers[key];
                    return (<ResultItem 
                        answer={currentAnswer.answer} 
                        username={currentAnswer.username} 
                        />)
                    })
            */}
                <ResultItem answer="Ginger Under Burns" username="Scott" votes="3" points="1000" />
                <ResultItem answer="Gutter Utter Butter" username="Phil" votes="0" points="0" />
                <ResultItem answer="Get Used Bitches" username="Byron" votes="1" points="150" />
                <ResultItem answer="Gentrifcation Usually Betters" username="Tolu" votes="0" points="0" />                
            </div>
        )
    }
}