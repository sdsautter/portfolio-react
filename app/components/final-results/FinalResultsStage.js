import React, {Component} from "react";
import FinalResultItem from "./FinalResultItem.js";

export default class FinalResultsStage extends Component {
    constructor(props){
        super(props);
        this.finalResults = this.finalResults.bind(this);
    }
    finalResults() {
        console.log(this.props.results);
        return this.props.results.map((player) => {
            return <FinalResultItem 
            score={player.points}
            username={player.username}
            />
        });
    }
    render() {
        return (
            <div className="col-11 main-game text-center">
                <h1>Game Over!</h1>
                {this.finalResults()}
        
            </div>
        )
    }
}