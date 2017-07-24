import React, {Component} from "react";

export default class Navbar extends Component{
    constructor() {
        super();
    }
    
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <a className="navbar-brand" href="#">Acronauts</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link" href="/logout">Logout</a>
                    </div>
                </div>
            </nav>
        )
    }
}
