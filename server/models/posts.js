import mongoose from "mongoose";



//schema for the database
const PostSchema = new mongoose.Schema({  
    
post:{

    pic:String,

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
}

)

export default mongoose.model("posts",PostSchema);