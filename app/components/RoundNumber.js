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
                    <p>Round: 1</p>
                )
                break;
            case 2: 
                return (
                    <p>Round: 2</p>
                )
                break;
            case 3:   
                return (
                    <p>Round: 3</p>
                )
                break;
            case 4:   
                return (
                    <p>Round: 4</p>
                )
                break;
            case 5:   
                return (
                    <p>Round: 5</p>
                )
                break;
            case 6:   
                return (
                    <p>Final Round</p>
                )
                break;
        } 
    }

    render() {
        return (
            <div className="col-1 text-left">
                {this.roundNumberRender()}
            </div>
        )
    }
}