import React from "react"
import "./HomeFeed.css"
import ViewPostSmall from "../view-post/ViewPostSmall"

function HomeFeed() {
    return (
        <div id="home-feed-container">
            <ViewPostSmall seed={1}/>
            <ViewPostSmall seed={2}/>
            <ViewPostSmall seed={3}/>
            <ViewPostSmall seed={4}/>
            <ViewPostSmall seed={5}/>
            <ViewPostSmall seed={6}/>
            <ViewPostSmall seed={7}/>
            <ViewPostSmall seed={8}/>
        </div>
    )
}

export default HomeFeed