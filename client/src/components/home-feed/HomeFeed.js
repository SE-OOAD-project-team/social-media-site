import React, { useState } from "react"
import "./HomeFeed.css"
import ViewPostSmall from "../view-post/ViewPostSmall"
import ViewPost from "../view-post/ViewPost";

function HomeFeed() {
    const [ viewFullPost, setViewFullPost ] = useState(false);
    return (
        <>
        <div id="home-feed-container">
            <ViewPostSmall seed={1} setViewFullPost={setViewFullPost} />
            <ViewPostSmall seed={2} setViewFullPost={setViewFullPost} />
            <ViewPostSmall seed={3} setViewFullPost={setViewFullPost} />
            <ViewPostSmall seed={4} setViewFullPost={setViewFullPost} />
            <ViewPostSmall seed={5} setViewFullPost={setViewFullPost} />
            <ViewPostSmall seed={6} setViewFullPost={setViewFullPost} />
            <ViewPostSmall seed={7} setViewFullPost={setViewFullPost} />
            <ViewPostSmall seed={8} setViewFullPost={setViewFullPost} />
        </div>
        {viewFullPost && (<div id="home-feed-vp-full-container">
            <ViewPost setViewFullPost={setViewFullPost}/>
        </div>)}
        </>
    )
}

export default HomeFeed