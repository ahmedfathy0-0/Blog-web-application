
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let ID = 1;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//GET All posts
app.get("/allposts", (req, res) => {
    res.json(posts);
});

//GET a specific post by id

app.get("/posts/:id",(req,res)=>{
    const post = posts.find((post) => post.id == req.params.id);
    if(post){
        res.json(post);
    }else{
        res.status(404).json({message: "Post not found"});
    }
});




//Filter posts by title

app.get("/filter",(req,res)=>{
    const query = req.query.query.toLowerCase();
    const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(query));
    res.json(filteredPosts);
});

//POST a new post
app.post("/posts", (req, res) => {
    const { title, image, content } = req.body;
    if (!title || !image || !content) {
        res.status(400).json({ message: "Please provide title, image, and content" });
    } else {
        const newPost = new Post(title, image, content);
        posts.push(newPost);
        res.status(201).json(newPost);
    }
});

//PATCH a post by providing the post id and the updated fields.
app.patch("/posts/:id", (req, res) => {
    const post = posts.find((post) => post.id == req.params.id);
    if (post) {
        const { title, image, content } = req.body;
        if (title) {
            post.title = title;
        }
        if (image) {
            post.image = image;
        }
        if (content) {
            post.content = content;
        }
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});

//DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
    const post = posts.find((post) => post.id == req.params.id);
    if (post) {
        posts = posts.filter((post) => post.id != req.params.id);
        res.json(post);
    } else {
        res.status(404).json({ message: "Post not found" });
    }
});





app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

class Post {
    constructor(title, image, content) {
        this.id = ID++;
        this.title = title;
        this.image = image;
        this.content = content;
    }
}



// In-memory data store
let posts = [
    new Post(
        "The Rise of Decentralized Finance",
        "/uploads/image-1.jpg",
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading."
    ),
    new Post(
        "The Impact of Artificial Intelligence on Modern Businesses",
        "/uploads/image-2.jpg",
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities."
    ),
    new Post(
        "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        "/uploads/image-3.jpg",
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference."
    ),
    new Post(
        "The Rise of Decentralized Finance",
        "/uploads/image-4.jpg",
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading."
    ),
    new Post(
        "The Impact of Artificial Intelligence on Modern Businesses",
        "/uploads/image-5.jpg",
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities."
    ),
    new Post(
        "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        "/uploads/image-6.jpg",
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference."
    ),
    new Post(
        "The Rise of Decentralized Finance",
        "/uploads/image-7.jpg",
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading."
    ),
    new Post(
        "The Impact of Artificial Intelligence on Modern Businesses",
        "/uploads/image-8.jpg",
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities."
    ),
    new Post(
        "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        "/uploads/image-9.jpg",
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference."
    ),
    new Post(
        "The Rise of Decentralized Finance",
        "/uploads/image-10.jpg",
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading."
    ),

    
];
