import React from "react";
import "./ViewPostSmall.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

function ViewPostSmall({seed, setViewFullPost}) {
    const postClicked = () => {
        setViewFullPost(true);
    }
    return (
        <div className="vp-small-container" onClick={postClicked}>
            <img className="vp-small-img" src={"https://picsum.photos/800/800?random=" + seed} />
            <div className="vp-small-info-container">
                <div className="vp-small-profile-container">
                    <img className="vp-small-profile-pic" src="https://picsum.photos/30/30?random=2" />
                    <p>profileName</p>
                </div>
                <div className="vp-small-interactions-container">
                    <div className="vp-small-like-container">
                        <FontAwesomeIcon icon={faHeart} className="fa-icon-heart" />
                        <p>1.2k</p>
                    </div>
                    <div className="vp-small-comment-container">
                        <FontAwesomeIcon icon={faComment} className="fa-icon-comment" />
                        <p>38</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPostSmall;