import multer from "multer";
import PostInteraction from "../controllers/posts.js";
import express from "express";
const router = express.Router();

import PostSchema from "../models/posts.js";

const upload = multer({ dest: 'post-pics/' })


//routing the path
router.post("/" , upload.single("photo"), async(req,res)=>{
    console.log("Here!!")
    if(!req.file){
        res.send("File not found.")
        return;
    }
    console.log(req.file)

    const posts1 = {
        post_id: "ABC123",
        user_details: {
            name: req.body.username,
            profile_pic: "hbcjnjdsnc",
        },
        desc: req.body.desc,
        pic: req.file.filename,
        comments: [],
        likes_count: 0,
        comments_count: 0,
    }
    console.log(posts1)

                                      
    const Interaction = new PostSchema(posts1); //convert the request body into schema
    

    try{
        const newInteraction = await Interaction.save(); //save the schema in mongodb
        res.status.json(newInteraction);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    }
);

export default router