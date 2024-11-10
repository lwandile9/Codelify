# Code Heads Company Portfolio & Blog Website

Welcome to the Code Heads Company Portfolio & Blog Website repository! This project showcases Code Heads' work and provides a blog for insights and tutorials, establishing a professional online presence.

## Project Overview
This website highlights Code Heads' projects and shares tech knowledge through a blog, combining a portfolio with informative posts for clients and tech enthusiasts.

## Key Features

Portfolio Showcase: Displays projects with descriptions, images, and links.
Blog Section: Allows creation and editing of blog posts.
Responsive Design: Ensures a mobile-friendly experience.
Admin Panel: Manages blog posts and portfolio items.
Technologies Used
Front-End
HTML5 and CSS3: For layout and styling.
JavaScript and React: Provides a dynamic, interactive user interface.
Back-End
Node.js and Express.js: Powers server-side logic and APIs.
Database
MongoDB or Firebase: Stores blog posts and project data.
Deployment
GitHub Pages or Netlify: Hosts the site for public access.
Getting Started

## To run this project locally:

````
Clone the Repository: git clone https://github.comlwandile9/code-heads/ cd code-heads

Install Dependencies: npm install cd client npm install cd ..
````

## Set Up Environment Variables:

````
Create a .env file in the root directory: MONGODB_URI=your_mongodb_uri PORT=5000
Run the Server: npm run dev
````

## Usage

Portfolio Section: View and explore projects.
Blog Section: View blogs.
Admin Panel: Access for managing content.
Deployment
Deployed the front end on Netlify.
We used Heroku for back-end deployment 



## Developers 

- Lwandile Toto
- Gcina NGxowa
- Anathi Nkohla
- Njabulo Nxumalo
- Milani kukuma

# Folder structure for this project 
````
code-heads/
├── client/                    # Front-end application
│   ├── public/                # Public assets (HTML, images)
│   │   ├── index.html         # Main HTML file
│   │   └── ...                # Additional public assets
│   ├── src/                   # React source files
│   │   ├── components/        # Reusable components (Navbar, Footer, etc)
│   │   ├── pages/             # Pages (Home, services, Blog, Admin)
│   │   ├── App.js             # Main app file
│   │   └── index.js           # Entry point for React app
│   └── package.json           # Front-end dependencies and scripts
├── server/                    # Back-end application
│         
│  
│   ├─  Auth.js               #  authentication
│   ├── server.js
    ├── Blog.js               # Main server file
│   └── Utlis.js              # All utility function including password reset
├── .env                     
├── .gitignore               
├── README.md                 
└── package.json              
````
## Explanation the node.js sever  ( the Key Features) :
User Authentication (auth.js):

Signup: The user provides an email and password, which is hashed using bcrypt and stored in Firebase Firestore.
Login: The email and password are compared against the stored values. If valid, a JWT is issued, and a session is created.
Password Reset: A Firebase authentication function (generatePasswordResetLink) is used to send a password reset email to the user.
Blog Post CRUD Operations (blog.js):

Create: Adds a new blog post to Firestore.
Read: Retrieves all blog posts from Firestore.
Update: Updates an existing blog post in Firestore based on the provided id.
Delete: Deletes a blog post by its id.
Search: Allows searching blog posts by title or ID.
Session Management:

User sessions are handled using express-session, storing session data like the logged-in user's email.


## Gettting started :

1. git clone  ```` https://github.com/lwandile9/code-heads.git ````

2. cd code-heads

3. npm install -g vite  ( install globally ) or  npm install vite --save-dev  ( install locally)


3. npm run dev   // to start the server

if node modules are  not present  run this command  ( npm install
)
