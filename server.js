import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import axios from "axios";


const app = express();
const port = 3000;
const API_URL = 'http://localhost:4000';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const response = await axios.get(`${API_URL}/allposts`);
    console.log(response.data);
    res.render('index.ejs', { posts: response.data });

});

app.get('/newpost', (req, res) => {
    res.render('newpost.ejs');
});

app.post('/submit', upload.single('image'), async (req, res) => {
    try{
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const newPost = {
        title: req.body.name,
        image: imagePath,
        content: req.body.blog,
    };
    const response = await axios.post(`${API_URL}/posts`, newPost);
    res.redirect(`/post/${response.data.id}`);
    } 
    catch(err){
        console.log(err);   
    }
});

app.get('/updatepost' , async(req, res) => {
    const response = await axios.get(`${API_URL}/allposts`);
    res.render('updatepost.ejs', { posts: response.data });
});

app.get('/update/:id', async (req, res) => {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render('update.ejs', { post: response.data });
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
    const response = await axios.get(`${API_URL}/allposts`);
    res.render('delete.ejs', { posts: response.data });
});
app.get('/delete/:id', async (req, res) => {
    const response = await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect('/');
});

app.get('/post/:id', async (req, res) => {
    try{
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render('post.ejs', { post: response.data });
    }
    catch(err){
        console.log(err);
    }
});


app.get('/search',async (req, res) => {
    const query = req.query.query.toLowerCase();
    const response = await axios.get(`${API_URL}/filter`, { params: { query } });
    res.render('searchresults.ejs', { results: response.data, query });
});








app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
