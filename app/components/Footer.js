import React, {Component} from "react";

export default class Footer extends Component{
    constructor() {
        super();
    }
    
    render() {
        return (
         <footer className="footer z-index-2">
            <div className="container">
                <span className="text-muted">Place sticky footer content here.</span>
            </div>
        </footer>
        )
    }
}
