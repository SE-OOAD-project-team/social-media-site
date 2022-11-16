import User from '../models/user.js';
import Post from '../models/posts.js';
import multer from 'multer';
import uuidv4 from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(process.env.UPLOAD_FOLDER));
    },

    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(new Error('Only images allowed'));
    }
};

let upload = multer({ storage, fileFilter });

let upload_single = upload.single('photo');

//to get the body and save it in the database
const PostInteraction = async (req, res) => {
    let post = {
        name: res.locals.token_data.username,
        pic: req.file.filename,
        desc: req.body.desc,
        pic: req.file.filename,
        comments: [],
        likes_count: 0,
        comments_count: 0,
    }

    const Interaction = new Post(post); //convert the request body into schema

    const user = await User.findOne({ username: res.locals.token_data.username });

    try {
        await Interaction.save(); //save the schema in mongodb
        user.posts.push(Interaction);
        await user.save();
        res.json({ status: 'Success' });
    } catch (err) {
        res.status(400).send(err);
    }
};

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

export { PostInteraction, upload_single };
