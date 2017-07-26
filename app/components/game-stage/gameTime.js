import React, {Component} from "react";

export default class GameTime extends Component{
    
    constructor() {
        super();
        
        this.state = {
            timeLeft: 60,
            timerId: {}
        }

        this.timer = this.timer.bind(this);
    }

    timer() {
        
        let timerId = setInterval(() => {
            let time = this.state.timeLeft - 1;
            this.setState({timeLeft: time})
            }, 1000);

        this.setState({ timerId })
        
    }

    componentDidMount() {  
            this.timer();
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
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