import React, {Component} from "react";

export default class GameTime extends Component{
    
    constructor() {
        super();
        
        this.state = {
            timeLeft: 60
        }

        this.timer = this.timer.bind(this);
    }

    timer() {
        window.setInterval(() => {
            let time = this.state.timeLeft - 1;
            this.setState({timeLeft: time})}, 1000);
    }

    componentDidMount() {
        
            this.timer();

    }
    
    render() {
        return (
            <div className="row">
                <div className="col text-center">
                    <p className="time-left">{this.state.timeLeft}</p>
                </div>
            </div>
        )
    }
}