import postSchema from "../models/posts.js"

const recommendation = async(req,res)=>{
    const result = (await postSchema.find({})).map(post => post._id);
    res.send(result);
}

export default recommendation;