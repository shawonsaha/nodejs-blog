// npm install nodemon --save-dev
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// The --save option is to have the dependencies listed in our package.json
// so that someone else can install the dependencies later if we give them the project
// they need only to run npm install with no arguments
// ----------------------------------------------------------------------------------------------------------
// The -dev option is to specify that we install nodemon for development purposes only.
// We do not want nodemon to be part of the production version of the app.
// When nodemon is installed, in package.json you can see it listed under devDependencies.
// This indicates that the package is for development purposes only and not included in our app when we deploy it.

// npm start
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// We will be starting our app from within a npm script with npm start.
// To do so, in package.json, go to “ scripts ” and make the following change
// "start": "nodemon index.js"
// So instead of running our app with node index.js as we have done previously, we now run it with: npm start

// EJS
// ‾‾‾‾‾‾‾‾
// npm install ejs --save
// ejs a templating engine that allows us to abstract our app into different layout files
// so that we don’t repeat common code, yet still serve the same HTML file as before
// ejs lets us generate HTML with plain JavaScript in simple straightforward scriplet tags i.e. <%= ... %>

// Previously, we responded to a get request with the following:
// app.get('/',(req,res)=>{ res.sendFile(path.resolve(__dirname,'pages/index.html'))})
// Now with EJS, we do the following,
// app.get('/',(req,res)=>{res.render('index');})

// res.render( ‘ index ’ ) will look in a 'views' folder for the file index.ejs.
// Thus, we rename our current pages folder to views.
// And in it, rename the file extension of index.html to index.ejs
// ejs syntax => https://i.stack.imgur.com/3xZVH.png

// body-parser parse incoming request bodies in a middleware and make the form data available under the req.body property
// npm install body-parser

//  Displaying a List of Blog Posts
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// we use the BlogPost model’s find method to find all the database records.
// We do this whenever the home page is requested.
// Thus in app.get for the home page i.e. ‘ / ’

// Dynamic Data with Templating Engines
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Now that we have the blogposts data returned in an array, we will use our
// EJS templating engine to dynamically display the blog posts in the home view

// In index.ejs, you currently see repeated <div class="post-preview"> tags each representing a blog post
// Thus, we will loop through the blogposts array in a for loop and
// render a <div class="post-preview"> tag for each blogpost

// Required Modules
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
const ejsLint = require("ejs-lint");
const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost"); // Database schema
const path = require("path"); // to use absolute path '__direname'
const ejs = require("ejs"); // we tell Express to use EJS as our templating engine
const bodyParser = require("body-parser"); // to get req.body into json format

// Configurations
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
const app = express(); // The app variable contains all of the settings and routes for this application

app.set("view engine", "ejs"); // any file ending in .ejs should be rendered with the EJS package

app.use(express.static("public")); // register a public folder for serving static files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Atlas Connection
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
mongoose.connect(
  "mongodb+srv://shawonsaha:5DnUZBV4nHr3z8pw@nodefcc-wxnma.mongodb.net/blog?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true } // require to avoid deprecation warning
);

// Client Side Setup
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// rendering homepage
app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({}); // retrieve all the blog posts from DB and assigning them to the variable
  //console.log(blogposts);
  res.render("index", {
    blogposts, // we pass back the blogposts data back to the client browser by providing it as the 2 nd argument to render
  }); // With this, index.ejs view now has access to the blogposts variable.
});

// about page
app.get("/about", function (req, res) {
  res.render("about");
});

// contact page
app.get("/contact", function (req, res) {
  res.render("contact");
});

// blogposts page
app.get("/post", function (req, res) {
  res.render("post");
});

// create new blog post page
app.get("/posts/new", function (req, res) {
  res.render("create");
});

// Send New Post to DB
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// POST is used to create records on servers
app.post("/posts/store", async (req, res) => {
  // the following method is an asynchronous call
  await BlogPost.create(req.body); // will await the completion of the current line before the below line can be executed
  res.redirect("/"); // after creating new blogpost rediret to homepage
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
