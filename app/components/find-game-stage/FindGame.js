import React, {Component} from "react";
import axios from "axios";

export default class FindGame extends Component {
    constructor() {
       super();
    //    this.findGamePost = this.findGamePost.bind(this);
   }
    
    // findGamePost(event) {
    //     event.preventDefault();
    //     axios.post("/api/games", {})
    //         .then(function (response) {
    //             console.log("Hello");
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    
    render() {
        return (
                <div className="col-10 main-game">
                    <div className="row">
                        <div className="col text-center">
                            <h1>Game Rules</h1>
                                <p className="game-rule">There are 5 rounds and a final round.</p>
                                <p className="game-rule">You have 60 seconds to submit an answer.</p>
                                <p className="game-rule">In each round you create an acronym using the letters provided.</p>
                                <p className="game-rule">After everyone submits an answer, or the time runs out, you then vote for your favorite answer.</p>                                
                                <p className="game-rule">The quicker you submit an answer, the more points you can earn per vote.</p>
                                <p className="game-rule">If you don't vote, you can't earn points for that round.</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-3 offset-5">
                            <form onSubmit={this.findGamePost}>
                                <button name="findGame" className="btn btn-success vote-answer">Find Game</button>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}