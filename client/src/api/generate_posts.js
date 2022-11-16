import React, { useState, useEffect } from "react";

function GeneratePost() {
    const username_list = ["pranavnaikp", "nr_ramith", "anonymousguy", "randomuser", "skyblue", "billiejean", "johndoe", "youngthug"]
    const desc_list = [
        "A beautiful day! #life #love",
        "Crazy crazy!! #living #crazy",
    ]

    const [ imgSrc, setImgSrc ] = useState(null)

    const getimg = async () => {
        const res = await fetch("https://picsum.photos/300/450")
        const img_blob = await res.blob()
        const img_base64 = URL.createObjectURL(img_blob);
        console.log(img_blob)
        console.log(img_base64);
        setImgSrc(img_base64);
    }

    useEffect(() => {
        getimg();
    }, [])
    

    const postdata = {
        post_id: "ABC123",
        user_details: {
            name: "profileName",
            profile_pic: "https://picsum.photos/30/30?random=2",
        },
        desc: "post description goes here",
        pic: "https://picsum.photos/300/450?random=3",
        comments: [{
            name: "user1",
            profile_pic: "/temp/wallpaper.jpg",
            comment: "Well done. jfdnsfklds jkfndsknf."
        }],
        likes_count: 233,
        comments_count: 45,
    };

    return (
        imgSrc !== null && (<img src={imgSrc} />)
    )
}

export default GeneratePost;