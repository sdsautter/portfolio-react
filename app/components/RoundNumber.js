import React, {Component} from "react";

export default class RoundNumber extends Component {
    constructor(props) {
        super(props);
        this.roundNumberRender = this.roundNumberRender.bind(this);
    }

    roundNumberRender() {
        switch(this.props.roundNumber){
            case 1:
                return (
                    <span className="first-rounds">Round: 1</span>
                )
                break;
            case 2: 
                return (
                    <span className="first-rounds">Round: 2</span>
                )
                break;
            case 3:   
                return (
                    <span className="first-rounds">Round: 3</span>
                )
                break;
            case 4:   
                return (
                    <span className="second-rounds">Round: 4</span>
                )
                break;
            case 5:   
                return (
                    <span className="second-rounds">Round: 5</span>
                )
                break;
            case 6:   
                return (
                    <span className="final-rounds">Final Round</span>
                )
                break;
        } 
    }

    render() {
        return (
            <div className="col-md-3 col-sm-5 text-center align-self-start">
                {this.roundNumberRender()}
            </div>
        )
    }
}