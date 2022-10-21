import React from "react";
import "./userPage.css"

const UserPage = ()=>{

    return(
      
<>

    <div className="AppName"><h1>App Name</h1></div>
        
        <div className="Profile">
            <div className="alignProfile">
            <img className="userPic" src="https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif" alt="user profile pic loading"/>

            <h2 className="userName">Your Username</h2>

            <div className="userDetM"> <div className="userDet"><h4>100</h4> <p> following</p></div> <div className="userDet"><h4>200</h4> <p> followers</p></div> <div className="userDet"><h4>7</h4> <p> Posts</p></div></div>

            <button className="editProfile">Edit Profile</button>
            </div>
        </div>

        <div className="divider1"></div>

        <div className="posts">
            <h1 className="postTitle">Your Posts</h1>
        </div>
</>
    
    )
}



export default UserPage;