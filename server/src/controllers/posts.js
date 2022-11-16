import PostSchema from "../models/posts.js";
import multer from "multer";
import  uuidv4  from 'uuid';
import path from "path";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images');
    },

    filename: function(req,file,cb){
        cb(null.uuidv4() + '-'+Date.now()+path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb)=>{
    const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        res.send("false")
    }
}


let upload = multer({storage,fileFilter});



let posts1={};
//to get the body and save it in the database
const PostInteraction =(upload.single('photo'),async(req,res)=>{

     posts1 = {
        post:{

            pic:"req.body.post.pic",
        
            likes:[{
                names:"random_name",
                likeCount:0, 
            }],
        
            comments: 
               [{
                    name:'random_name1',
         
                    comment:"xyz",
        
                    likeCount:[{
                        
                        names:"something",
        
                        likes:0
                    }
                    ]
                        
                    
               }]
            }
        }

                                      
    const Interaction = new PostSchema(req.body); //convert the request body into schema
    

    try{
        const newInteraction = await Interaction.save(); //save the schema in mongodb
        res.status.json(newInteraction);
    }
    catch(err){
        res.send(err);
    }
    }
    

    );
    


//     const storage = multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, 'images');
//         },
//         filename: function(req, file, cb) {   
//             cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//         }
//     });
    
//     const fileFilter = (req, file, cb) => {
//         const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//         if(allowedFileTypes.includes(file.mimetype)) {
//             cb(null, true);
//         } else {
//             cb(null, false);
//         }
//     }
    
//     let upload = multer({ storage, fileFilter });
    
//     router.route('/add').post(upload.single('photo'), (req, res) => {
//         const name = req.body.name;
//         const birthdate = req.body.birthdate;
//         const photo = req.file.filename;
    
//         const newUserData = {
//             name,
//             birthdate,
//             photo
//         }
    
//         const newUser = new User(newUserData);
    
//         newUser.save()
//                .then(() => res.json('User Added'))
//                .catch(err => res.status(400).json('Error: ' + err));
//     });

export default PostInteraction;