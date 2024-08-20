import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
let ID = 0;

class Post {
    constructor(title, image, content) {
        this.id = ID++;
        this.title = title;
        this.image = image;
        this.content = content;
    }
}

let postvector = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: postvector });

});

app.get('/newpost', (req, res) => {
    res.render('newpost.ejs');
});
app.post('/submit', upload.single('image'), (req, res) => {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const newPost = new Post(req.body.name, imagePath, req.body.blog);
    postvector.push(newPost);
    res.redirect(`/post/${newPost.id}`);
    console.log(postvector);
});

app.get('/updatepost' , (req, res) => {
    res.render('updatepost.ejs', { posts: postvector });
});
app.get('/update/:id', (req, res) => {
    const post = postvector.find((post) => post.id == req.params.id);
    res.render('update.ejs', { post });
});

app.post('/update/:id', upload.single('image'), (req, res) => {
    const post = postvector.find((post) => post.id == req.params.id);

    if (post) {
        post.title = req.body.name;
        post.content = req.body.blog;
        if (req.file) {
            post.image = `/uploads/${req.file.filename}`;
        } else if (req.body.oldImage) {
            post.image = req.body.oldImage; 
        }
        res.redirect(`/post/${post.id}`);
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/deletepost' , (req, res) => {
    res.render('delete.ejs', { posts: postvector });
});
app.get('/delete/:id', (req, res) => {
    postvector = postvector.filter((post) => post.id != req.params.id);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const post = postvector.find((post) => post.id == req.params.id);
    if (post) {
        res.render('post.ejs', { post });
    } else {
        res.status(404).send('Post not found');
    }
});










app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
