import React, {Component} from "react";
import ResultItem from "./ResultItem.js";

export default class ResultsStage extends Component {
    render() {
        return (
            <div className="col-10 main-game text-center">
                <ResultItem />
                <ResultItem />
                <ResultItem />
                <ResultItem />                
            </div>
        )
    }
}