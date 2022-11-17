import postSchema from "../models/posts.js"
import Mongoose from "mongoose";





const comments = async(req,res)=>{
    const body = req.body;
    const post_id = body.post_id;
    const comment = req.body.comment;
    const user = req.body.commented_user_name;
    const obj = {
        name: user,
        profile_pic: "abc", // change this later
        comment: comment,
    }
    const data = await postSchema.updateOne({"_id": Mongoose.Types.ObjectId(post_id)},{$push:{"comments": obj},$inc:{"comments_count":1}})
    res.send(data)
}

export default comments;