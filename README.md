# Blog Website Project

This is a blog website project built as part of my personal web development practice.  
It includes a server-side application using Node.js and Express, dynamic page rendering with EJS, and a MongoDB database for storing blog content. The site is deployed on Render.

## Features

- Responsive front-end with HTML, CSS, and EJS
- Blog post creation and display
- MongoDB database integration using Mongoose
- Environment variables handled via dotenv
- Hosted and deployed on Render

## Live Demo

https://blog-website-5axk.onrender.com/

This project is deployed on Render, a cloud platform for hosting web applications.
You can access the live version of this blog site at the link above.

## Tech Stack

- **Frontend:** HTML / CSS / JavaScript / EJS
- **Backend:** Node.js / Express.js
- **Database:** MongoDB (via Mongoose)
- **Deployment:** Render

## Project Structure

```
node-advanced-blog/
├── controllers/ # Route handler functions
├── models/ # Mongoose schemas and database models
├── routes/ # Express route definitions
├── views/ # EJS templates for dynamic rendering
├── public/ # Static assets (CSS, client JS, images)
├── node_modules/ # Installed dependencies (auto-generated)
├── .gitignore # Files and folders to exclude from version control
├── index.js # Main application entry point
├── package.json # Project metadata and dependencies
├── package-lock.json # Exact versions of installed packages
└── README.md # Project documentation
```

## Dependencies

- `express` – for building the web server  
- `mongoose` – for interacting with the MongoDB database  
- `ejs` – for rendering dynamic HTML templates  
- `dotenv` – for loading environment variables from a `.env` file

→ These dependencies will be installed by running:

```
npm install

```


## How to Run Locally

1. Clone the repository:
git clone https://github.com/naoko-portfolio/blog-website.git
cd blog-website

2. Install dependencies:
npm install

3. Create a .env file in the root directory and add:
MONGO_URI=your_mongodb_connection_string

4. Start the server:
node index.js

5. Open your browser and go to:
http://localhost:3000

## Author

Created by Naoko Marin
This project is part of my web development portfolio.