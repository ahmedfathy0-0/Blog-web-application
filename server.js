import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import axios from "axios";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
env.config();



const app = express();
const port = 3000;
const API_URL = 'http://localhost:4000';
const saltRounds = 10;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


let signinuseremail ='';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


app.get('/', async (req, res) => {
    const response = await axios.get(`${API_URL}/allposts`);
    if(req.isAuthenticated()){
        res.render('index.ejs', { posts: response.data, isLogin: true });
    }
    else{
        res.render('index.ejs', { posts: response.data, isLogin: false });
    }
});

app.get('/newpost', (req, res) => {
    if(!req.isAuthenticated()){
            res.render('newpost.ejs', { isLogin: false });
    }
    else{
        res.render('newpost.ejs', { isLogin: true });
    }
});

app.post('/submit', upload.single('image'), async (req, res) => {
    try{
        if(req.isAuthenticated()){
            const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
            const newPost = {
                title: req.body.name,
                image: imagePath,
                content: req.body.blog,
                user_email: req.user.email,
            };
            console.log(newPost);
            const response = await axios.post(`${API_URL}/posts`, newPost);
            res.redirect(`/post/${response.data.id}`);
        }
    } 
    catch(err){
        console.log(err);   
    }
});

app.get('/updatepost' , async(req, res) => {
    if(!req.isAuthenticated()){
     res.render('updatepost.ejs', { posts: {} , isLogin: false});
    }
    else{
        const response = await axios.get(`${API_URL}/posts/user/${req.user.email}`);
        res.render('updatepost.ejs', { posts: response.data , isLogin: true});
    }
});

app.get('/update/:id', async (req, res) => {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    if(!req.isAuthenticated()){
        res.render('update.ejs', { post: response.data, isLogin: false });
    }
    else{
        res.render('update.ejs', { post: response.data, isLogin: true });
    }
});

app.post('/update/:id', upload.single('image'),async (req, res) => {
    try{
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const updatedPost = {
            title: req.body.name,
            image: imagePath,
            content: req.body.blog,
        };
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, updatedPost);
        res.redirect(`/post/${response.data.id}`);
    }
    catch(err){
        console.log(err);
    }
});

app.get('/deletepost' , async (req, res) => {
    
    if(!req.isAuthenticated()){
        res.render('delete.ejs', { posts: {} , isLogin: false});
    }
    else{
        const response = await axios.get(`${API_URL}/posts/user/${req.user.email}`);
        res.render('delete.ejs', { posts: response.data , isLogin: true});
    }
    });
app.get('/delete/:id', async (req, res) => {
    const response = await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect('/');
});

app.get('/post/:id', async (req, res) => {
    try{
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    if(req.isAuthenticated()){
        res.render('post.ejs', { post: response.data, isLogin: true });
    }
    else{
        res.render('post.ejs', { post: response.data, isLogin: false });
    }
    }
    catch(err){
        console.log(err);
    }
});


app.get('/search',async (req, res) => {
    const query = req.query.query.toLowerCase();
    const response = await axios.get(`${API_URL}/filter`, { params: { query } });
   if(req.isAuthenticated()){
    res.render('searchresults.ejs', { posts: response.data, isLogin: true });
    }
    else{
    res.render('searchresults.ejs', { posts: response.data, isLogin: false });
    }
});

//Login and Register sign out 
app.get('/login', (req, res) => {
    res.render('login.ejs', { Login : true ,error :'', isLogin: false});
});
app.get('/register', (req, res) => {
    res.render('login.ejs', { Login : false,error :'',isLogin: false });
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed:', info);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return next(err);
            }
            signinuseremail = user.email;
            res.redirect('/');
        });
    })(req, res, next);
});


 
app.post('/register', async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        console.log('Attempting to register:', user.email);
        const result = await axios.get(`${API_URL}/users/${user.email}`);
        if (result.data) {
            res.render('login.ejs', { Login: false, isLogin: false, error: 'Email already exists. Try logging in.' });
        } else {
            bcrypt.hash(user.password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    res.status(500).send('Server error');
                } else {
                    user.password = hash;
                    await axios.post(`${API_URL}/users`, user);
                    req.login(user, (err) => {
                        if (err) {
                            console.error('Error logging in after registration:', err);
                            res.status(500).send('Server error');
                        } else {
                            signinuseremail = user.email; // Set signinuseremail after successful login
                            res.redirect('/');
                        }
                    });
                }
            });
        }
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).send('Server error');
    }
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return next(err);
        }
        signinuseremail = ''; 
        res.redirect('/');
    });
});
passport.use(new Strategy(
    { usernameField: 'email' }, // Specify the field name for email
    async function verify(email, password, cb) {
        try {
            const result = await axios.get(`${API_URL}/users/${email}`);
            const user = result.data;
            console.log('Verifying user:', user);
            if (!user) {
                return cb(null, false, { message: 'User not found' });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return cb(err);
                }
                if (isMatch) {
                    return cb(null, user);
                } else {
                    return cb(null, false, { message: 'Invalid password' });
                }
            });
        } catch (err) {
            console.error('Error verifying user:', err);
            return cb(err);
        }
    }
));
 
 passport.serializeUser((user, cb) => {
     cb(null, user.email);
 });
 
 passport.deserializeUser(async (email, cb) => {
     try {
         const result = await axios.get(`${API_URL}/users/${email}`);
         const user = result.data;
         cb(null, user);
     } catch (err) {
         console.error('Error deserializing user:', err);
         cb(err);
     }
 });
 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
