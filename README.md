# 📝 Blog Web Application

## Overview
This project is a **Blog Web Application** created using **Node.js** ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white), **Express.js** ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white), **EJS** ![EJS](https://img.shields.io/badge/EJS-4E9F3D?logo=javascript&logoColor=white), and **PostgreSQL** ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white). 

The application allows users to create, view, edit, and delete blog posts, with all data stored in PostgreSQL. It includes user authentication features, enabling users to register, log in, and manage their blog posts securely.

You can access the deployed application at: [Blog Web Application](https://blog-web-application-puce.vercel.app/)

## 📦 Deliverables
- A **Node.js** project for core functionality.
- **EJS** files for the website's structure.
- **CSS** files for the website's styling.
- **PostgreSQL** database for data persistence.
- **Custom API** for handling blog post operations.

## 🚀 Features
- **User Authentication:** 🔐 Users can register, log in, and manage their blog posts. Use the following credentials for testing:
  - **Email:** `test@test.com`
  - **Password:** `test123`
- **Post Creation:** 📝 Users can create new blog posts.
- **Post Viewing:** 👀 Users can view all blog posts on the homepage.
- **Post Update/Delete:** ✏️🗑️ Users can edit and delete their posts.
- **API Integration:** 🌐 The application communicates with a custom API to manage blog posts and user data.
- **Data Persistence:** 🗄️ Blog posts and user information are stored in a PostgreSQL database.
- **Styling:** 💅 The application is responsive and well-styled for a great user experience.

## 🚀 Setup & Usage
1. **Access the Application:**
   Visit the deployed application at [https://blog-web-application-puce.vercel.app/](https://blog-web-application-puce.vercel.app/).

2. **User Authentication:**
   Use the following credentials to log in:
   - **Email:** `test@test.com`
   - **Password:** `test123`

Feel free to explore the features and test the functionality of the application.

## API Details
The application uses the following API endpoints:

### Base URL
- [https://blog-web-app-api.vercel.app/](https://blog-web-app-api.vercel.app/)

### Endpoints

- **Get All Posts**
  - **Endpoint:** `/allposts`
  - **Method:** GET
  - **Description:** Retrieves all blog posts.
  - **Response Example:**
    ```json
    [
      {
        "id": 1,
        "title": "First Post",
        "image": "http://example.com/image.jpg",
        "content": "This is the content of the first post.",
        "user_email": "test@test.com"
      }
    ]
    ```

- **Get Post by ID**
  - **Endpoint:** `/posts/:id`
  - **Method:** GET
  - **Description:** Retrieves a specific blog post by its ID.
  - **Response Example:**
    ```json
    {
      "id": 1,
      "title": "First Post",
      "image": "http://example.com/image.jpg",
      "content": "This is the content of the first post.",
      "user_email": "test@test.com"
    }
    ```

- **Filter Posts**
  - **Endpoint:** `/filter`
  - **Method:** GET
  - **Query Parameters:** `query` (string) - The keyword to filter posts by title.
  - **Description:** Retrieves posts whose titles contain the query string.
  - **Response Example:**
    ```json
    [
      {
        "id": 1,
        "title": "Filtered Post",
        "image": "http://example.com/image.jpg",
        "content": "Filtered post content.",
        "user_email": "test@test.com"
      }
    ]
    ```

- **Get Posts by User**
  - **Endpoint:** `/posts/user/:user_email`
  - **Method:** GET
  - **Description:** Retrieves all posts by a specific user.
  - **Response Example:**
    ```json
    [
      {
        "id": 1,
        "title": "User's Post",
        "image": "http://example.com/image.jpg",
        "content": "This is a post by the user.",
        "user_email": "test@test.com"
      }
    ]
    ```

- **Create a New Post**
  - **Endpoint:** `/posts`
  - **Method:** POST
  - **Request Body:**
    ```json
    {
      "title": "New Post",
      "image": "http://example.com/newimage.jpg",
      "content": "This is a new post.",
      "user_email": "test@test.com"
    }
    ```
  - **Description:** Creates a new blog post.
  - **Response Example:**
    ```json
    {
      "id": 2,
      "title": "New Post",
      "image": "http://example.com/newimage.jpg",
      "content": "This is a new post.",
      "user_email": "test@test.com"
    }
    ```

- **Update a Post**
  - **Endpoint:** `/posts/:id`
  - **Method:** PATCH
  - **Request Body:**
    ```json
    {
      "title": "Updated Post Title",
      "image": "http://example.com/updatedimage.jpg",
      "content": "Updated post content."
    }
    ```
  - **Description:** Updates a specific blog post.
  - **Response Example:**
    ```json
    {
      "id": 1,
      "title": "Updated Post Title",
      "image": "http://example.com/updatedimage.jpg",
      "content": "Updated post content.",
      "user_email": "test@test.com"
    }
    ```

- **Delete a Post**
  - **Endpoint:** `/posts/:id`
  - **Method:** DELETE
  - **Description:** Deletes a specific blog post.
  - **Response Example:**
    ```json
    {
      "id": 1,
      "title": "Deleted Post",
      "image": "http://example.com/deletedimage.jpg",
      "content": "Content of the deleted post.",
      "user_email": "test@test.com"
    }
    ```

- **Get User by Email**
  - **Endpoint:** `/users/:email`
  - **Method:** GET
  - **Description:** Retrieves a specific user by their email.
  - **Response Example:**
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "test@test.com",
      "password": "hashedpassword"
    }
    ```

- **Create a New User**
  - **Endpoint:** `/users`
  - **Method:** POST
  - **Request Body:**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@test.com",
      "password": "password123"
    }
    ```
  - **Description:** Creates a new user account.
  - **Response Example:**
    ```json
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane@test.com",
      "password": "hashedpassword"
    }
    ```


