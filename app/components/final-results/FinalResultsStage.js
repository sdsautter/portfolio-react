import React, {Component} from "react";
import FinalResultItem from "./FinalResultItem.js";

export default class FinalResultsStage extends Component {
    constructor(props){
        super(props);
        this.finalResults = this.finalResults.bind(this);
    }
    finalResults() {
        console.log(this.props.result);
        return this.props.result.map((player) => {
            return <FinalResultItem 
            score={player.points}
            username={player.username}
            />
        });
    }
    render() {
        return (
            <div className="col-10 main-game text-center">
                {this.finalResults()}
            // {
            //     Object.keys(this.props.resultsInfo).map((key) => {
            //         let resultsInfo = this.props.resultsInfo[key];
            //         return (<ResultItem
            //             // answer={resultsInfo.answer}
            //             key={key} 
            //             score={resultsInfo.score} 
            //             username={resultsInfo.username} 
            //             />)
            //         })
            // }
                {/*<ResultItem answer="Ginger Under Burns" username="Scott" votes="3" points="1000" />
                <ResultItem answer="Gutter Utter Butter" username="Phil" votes="0" points="0" />
                <ResultItem answer="Get Used Bitches" username="Byron" votes="1" points="150" />
                <ResultItem answer="Gentrifcation Usually Betters" username="Tolu" votes="0" points="0" />*/}                
            </div>
        )
    }
}