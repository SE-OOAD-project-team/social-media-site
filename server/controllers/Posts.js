import PostSchema from "../models/posts.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";


//to get the body and save it in the database
const PostInteraction =async(req,res)=>{
    console.log(req.body)                               
    const Interaction = new PostSchema(req.body); //convert the request body into schema
    

    try{
        const newInteraction = await Interaction.save(); //save the schema in mongodb
        res.status.json(newInteraction);
    }
    catch(err){
        res.send(err);
    }

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
}

export default PostInteraction;