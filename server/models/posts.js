import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({  
    
post:{

    image:{
        type:String
    },

    likes:[{
        names:{
            type:String
        },
        likeCount:{
            type:Number
        }
    }],

    comments:
       [{
            name:{
                type:String
            },

            comment:{
                type:String
            },

            likeCount:[{
                
                names:{
                    type:String
                },

                likes:{
                    type:Number
                }
            }
            ]
                
            
       }]
    }

})

export default mongoose.model("posts",PostSchema);