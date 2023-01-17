const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bodyParser = require("body-parser");
const fs = require('fs');

const path = require('path');

const wifi = require('node-wifi');
// const cookieParser = require("cookie-parser");
// const sessions = require('express-session');

const app = express();
const open = require('open');
const { json } = require("express");

const multer = require('multer');
const e = require("express");

app.use(cors())

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

mongoose.connect("mongodb+srv://Himanshu21:Qwaszx%40123@cluster0.66ymbkc.mongodb.net/HimanshuBari");

app.get('/', (req, res) => {
    res.send("Server Running...")
})

const connection = mongoose.connection;
connection.once('open', (err) => {

    err ? console.log("hello") : console.log("Mongoose Database connected successfully");

})

// ---------------------------------------------------------
// ---------------------------------------------------------
// starts of Registartion and authentication
// ---------------------------------------------------------
// ---------------------------------------------------------

// Users Schema
const Users = mongoose.model('users', {
    userType: String,
    username: String,
    email: String,
    phone: String,
    password: String,
    time: String,
    profilePicCode: String,
    blogs: [{ type: Schema.Types.ObjectId, ref: 'blogs' }]
});

const Blogs = mongoose.model('blogs', {
    title: String,
    subtitle: String,
    dateOfPublish: Number,
    content: String,
    writer: { type: Schema.Types.ObjectId, ref: 'users' }
});

// for Creating User
app.post('/create', (req, res) => {

    const userData = req.body
    console.log(userData);

    const User = mongoose.model("users");

    User.find({ email: req.body.email }, (err, result) => {

        // err ? console.log(err) : true;

        if (result.length > 0) {
            res.json({
                "existErr": "Email ID Already Exist"
            })
        }
        else {
            Users({
                userType: userData.userType,
                username: userData.username,
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
                time: new Date()
            }).save((err, result) => {
                if (err) {
                    res.json({ "message": "some Error Occurred on Server" })
                    console.log(err);
                }
                else {
                    res.json({ "message": "User Registered Successfully" })
                }
            })
        }
    })



})


// for Authentication
app.post("/login", (req, res) => {

    var User = mongoose.model("users");
    var email = req.body.email;
    var password = req.body.password;

    try {
        if (!(email && password)) {
            res.json({ "emptyMessage": "All Fields are required" })
        }
        else {
            console.log(req.body);
            User.findOne({ email }, (err, userData) => {
                // console.log(userData._id);
                (!userData) ? res.json({ "errMessage": "wrong password or email" }) : ((password == userData.password) && (email == userData.email)) ? res.json({ "message": userData._id }) : res.json({ "errMessage": "wrong password or email" })
            })
        }
    } catch (error) {
        console.log(error);
    }

})

// for keeping every page logged in
app.post("/profileData", (req, res) => {

    var User = mongoose.model("users");
    var _id = req.body.id;

    console.log(_id);

    if (!req.body.id) {
        res.json({ "message": null })
    }
    else {
        console.log(req.body);
        User.findById(_id, function (err, userData) {
            if (err) {
                console.log(err);
                res.json({ message: err.message })
            }
            else {
                res.json(userData)
            }
        });
    }
})



// for Creating Blogs
app.post('/createBlog', function (req, res) {
    console.log(req.body);
    const blogData = req.body;
    Blogs({
        title: blogData.blogtitle,
        subtitle: blogData.subTitle,
        content: blogData.theBlog,
        writer: blogData.writer,
        dateOfPublish: blogData.dateOfPublish
    }).save().then((err) => {
        err ? res.json({ "errMessage": err.message }) : res.json({ "message": "Blog Published" });
    })
})

// for getting Blog Data
app.post('/getBlogData', (req, res) => {
    const Blog = mongoose.model('blogs')
    const _id = req.body.blogId
    console.log(_id);
    Blog.findById(_id, function (err, userData) {
        if (err) {
            console.log(err);
            res.json({ message: err.message })
        }
        else {
            res.json(userData)
        }
    });
})

// for getting ones/my blogs
app.post('/myBlogs', function (req, res) {
    const Blogs = mongoose.model("blogs");
    Blogs.find({ writer: req.body._id }, (err, result) => {
        err ? res.json(err) :
            res.json(result)
    })
})

// fordebugging
app.get('/getUsers', (req, res) => {
    const UserData = mongoose.model("users");
    UserData.find({}, (err, userData) => {
        err ? res.json(err) : res.json(userData)
    }
    )
})

// for deleteing blog


// for updating profile pic
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


let upload = multer({ storage })

// console.log(path.join(__dirname));

// console.log(arrayOfProfilePics);

app.post('/imgUpload', upload.single('profile'), (req, res) => {

    fs.rename(path.join(__dirname + '/public/images/' + req.file.filename), path.join(__dirname + '/public/images/' + "userProfilePic_" + req.body.id + "_" + req.file.filename), (err) => {
        if (err) throw err;
        console.log('Rename complete!');
    })


    // arrayOfProfilePics.filter((x) => {
    //     if (x.includes(req.body.id)) {
    //         fs.unlink(path.join(__dirname + '/public/images/' + x))
    //         console.log(x);
    //     }
    // })

    const arrayOfProfilePics = fs.readdirSync(path.join(__dirname + '/public/images/'));

    for (let i = 0; i < arrayOfProfilePics.length; i++) {
        if (arrayOfProfilePics[i].includes(req.body.id)) {
            fs.unlink(path.join(__dirname + '/public/images/' + arrayOfProfilePics[i]), (err) => {
                if (err) {
                    throw err
                } else {
                    console.log(arrayOfProfilePics[i] + i + 'got it 😂😂');
                }
            })
        }
    }


    Users.findOneAndUpdate({ _id: req.body.id }, { profilePicCode: "userProfilePic_" + req.body.id + "_" + req.file.filename }, (err) => {
        if (!err) {
            res.status(200).json({ 'msg': "done" })
        } else {
            res.status(404).json({ 'msg': err.message })

        }
    })

})

app.get('/data', (req, res) => {
    res.json({
        "name": "Himanshu",
        "twitter": "https://twitter.com/HimanshuBari19",
        "LinkedIn": "https://www.linkedin.com/in/himanshu-bari-8b31071b1/",
        "Google": "Just search Himanshu Bari Web developer. (I am also a SEO Expert)"
    })
})



// const oneDay = 1000 * 60 * 60 * 24;
// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized: true,
//     cookie: { maxAge: oneDay },
//     resave: false
// }));

// app.use(cookieParser());

// var session

// app.post('/session', (req, res) => {
//     console.log(req.body);
//     session = req.session
//     console.log(session);
//     if ((req.body.username == "himanshu") && (req.body.password == "2580")) {
//         res.json({ "msg": "great" })
//     } else {
//         res.json({ "err": "wrong" })
//     }
// })

// wifi setting

// Initialize wifi module
// Absolutely necessary even to set interface to null

app.listen(PORT, (err) => {
    err ? console.log(err.message) : console.log("http://localhost:" + PORT);
})