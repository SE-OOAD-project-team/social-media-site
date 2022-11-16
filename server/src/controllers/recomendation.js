import postSchema from "../models/posts.js"

let result = {};
const recommendation = (req,res)=>{
    result = postSchema.find({});
    res.send(result);
}

export default recommendation;