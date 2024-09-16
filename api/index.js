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

//Get all post by user
app.get('/posts/user/:user_email', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts WHERE user_email = $1', [req.params.user_email]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Create a new post
app.post('/posts', async (req, res) => {
  const { title, image, content, user_email } = req.body;
  if (!title || !image || !content || !user_email) {
    return res.status(400).json({ message: 'Please provide title, image, content, and user_email' });
  }
  try {
    const result = await db.query(
      'INSERT INTO posts (title, image, content, user_email) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, image, content, user_email]
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

//Login and Register
//get a specific user by Enail
app.get('/users/:email', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [req.params.email]);
    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

//create a new user
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}
);





app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
