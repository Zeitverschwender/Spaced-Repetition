import React, { Component } from "react";

import "./NotFoundPage.scss";

class NotFoundPage extends Component {
    state = {  }
    render() {
        return ( 
            <div className="main-404-wrapper">
                <div><h1>404</h1><h1>PAGE NOT FOUND</h1></div>
                <img src="https://thumbs.gfycat.com/HopefulConsciousBlackfish-size_restricted.gif" alt="Loading..."></img>
                <div><h2>The page you requested doesn't seem to exist (yet)</h2></div>
            </div>
         );
    }
}

export default NotFoundPage;