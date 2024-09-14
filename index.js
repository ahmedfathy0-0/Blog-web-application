import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


const db = new pg.Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

db.connect();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all posts
app.get('/allposts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get a specific post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
    const post = result.rows[0];
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Filter posts
app.get('/filter', async (req, res) => {
  try {
    const query = req.query.query.toLowerCase();
    const result = await db.query('SELECT * FROM posts WHERE LOWER(title) LIKE $1', [`%${query}%`]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error filtering posts:', error);
    res.status(500).json({ message: 'Error filtering posts' });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  const { title, image, content } = req.body;
  if (!title || !image || !content) {
    return res.status(400).json({ message: 'Please provide title, image, and content' });
  }
  try {
    const result = await db.query(
      'INSERT INTO posts (title, image, content) VALUES ($1, $2, $3) RETURNING *',
      [title, image, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Update a specific post
app.patch('/posts/:id', async (req, res) => {
  const { title, image, content } = req.body;
  try {
    const result = await db.query(
      'UPDATE posts SET title = COALESCE($1, title), image = COALESCE($2, image), content = COALESCE($3, content) WHERE id = $4 RETURNING *',
      [title, image, content, req.params.id]
    );
    const post = result.rows[0];
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete a specific post
app.delete('/posts/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [req.params.id]);
    const post = result.rows[0];
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
