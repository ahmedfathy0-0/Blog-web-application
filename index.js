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

class Post {
    constructor(title, image, content) {
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
    res.redirect('/'); // Redirect or render a response after submission
    console.log(postvector);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
