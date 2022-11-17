import postSchema from "../models/posts.js"
import Mongoose from "mongoose";





const likes = async(req,res)=>{
    const body = req.body;
    const post_id = body.post_id;
    // const comment = req.body.comment;
    // const user = req.body.commented_user_name;
    const data = await postSchema.updateOne({"_id": Mongoose.Types.ObjectId(post_id)},{$inc:{"likes_count":1}})
    res.send(data)
}

export default likes;