import React, {Component} from "react";
import axios from "axios";


export default class LeaveButton extends Component {
    constructor(props) {
        super(props);
        this.leaveClick = this.leaveClick.bind(this);
    }

    leaveClick() {
        axios.delete(`/api/games/${this.props.gameInstanceId}`)
            .then((response) => {
                console.log("Goodbye");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="row">
                <div className="col-1 text-left">
                    <img onClick={this.leaveClick} className="leave-button" src="assets/images/power-button.png" alt="leave game" />
                </div>
            </div>

        )
    }
}