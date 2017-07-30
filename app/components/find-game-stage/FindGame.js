import React, {Component} from "react";
import axios from "axios";

export default class FindGame extends Component {
    constructor() {
       super();
       this.findGamePost = this.findGamePost.bind(this);
   }

    findGamePost(event) {
        let addGameInstance = this.props.addGameInstance;
        event.preventDefault();
        this.props.setFindGameTrue();
        
        axios.post("/api/games")
            .then((response) => {
                console.log("Hello");
                return addGameInstance(response.data.gameInstance.gameInstanceId);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    render() {
        return (
                <div className="col-10 main-game">
                    <div className="row">
                        <div className="col text-center">
                            <h1 className="rules-header">Game Rules</h1>
                                <p className="game-rule">Create an acronym with the provided letters in the order given.</p>
                                <p className="game-rule">Vote for your favorite answer.</p>
                                <p className="game-rule">The quicker you submit, the more points you can earn.</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col text-center">
                            <form onSubmit={this.findGamePost}>
                                <button 
                                name="findGame" 
                                className="btn btn-success vote-answer"
                                disabled={this.props.findGame}
                                >Find Game</button>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}