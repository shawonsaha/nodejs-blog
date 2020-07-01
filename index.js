// Required Modules
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// const ejsLint = require("ejs-lint");
// const ejs = require("ejs"); // we tell Express to use EJS as our templating engine
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // to get req.body into json format
const fileUpload = require("express-fileupload"); // express-fileupload package to help upload files in Express
const expressSession = require("express-session"); // to keep user logged in use session

// Controllers
// ‾‾‾‾‾‾‾‾‾‾‾‾
const homeController = require("./controllers/home"); // render homepage with submitted posts fetching form DB
const loginController = require("./controllers/login"); // render login page
const logoutController = require("./controllers/logout"); // logout (session destroy)
const newUserController = require("./controllers/newUser"); // render signup / register page
const newPostController = require("./controllers/newPost"); // render create a new post page (static)
const getPostController = require("./controllers/getPost"); // fetch and render individual post from DB
const loginUserController = require("./controllers/loginUser"); // varify login credentials
const storePostController = require("./controllers/storePost"); // controlls submitted post sending into DB
const storeUserController = require("./controllers/storeUser"); // store newly registered user credential in DB
const searchPostController = require("./controllers/searchPost"); // render user query into a new page

// Configurations
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
const app = express(); // The app variable contains all of the settings and routes for this application

app.set("view engine", "ejs"); // any file ending in .ejs should be rendered with the EJS package

app.use(express.static("public")); // register a public folder for serving static files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload()); // handle user upload files

// secret string is used by the express-session package
// You can of course provide your own secret string
// https://github.com/expressjs/session#options
app.use(
  expressSession({
    secret: "keyboard cat", // sign and encrypt the session ID cookie being shared with the browser
    resave: true, // to avoid deprecated warrning
    saveUninitialized: true, // to avoid deprecated warrning
  })
);

//Custom Middlewares
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
const validateMiddleWare = require("./middleware/validateMiddleware"); // checks for empty title or body in submission of a new post
const authMiddleware = require("./middleware/authMiddleware");
// if user logged in, redirect to home page
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

// If we apply the middleware to our application using app.use(validateMiddleWare),
// this middleware will be executed for all request whereas we only want it to be executed for the request to create posts.
// Thus, to apply middleware for specific url requests, we do: "/posts/store" as first argument
// if Express sees a request from the given url ‘/posts/store’ , then execute the middleware validateMiddleWare
// Note: make sure the middleware is after app.use(fileUpload()) since we depend on the req object having the files property.
app.use("/posts/store", validateMiddleWare);
app.get("/posts/new", newPostController);

// MongoDB Atlas Connection
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
mongoose.connect(
  "mongodb+srv://shawonsaha:5DnUZBV4nHr3z8pw@nodefcc-wxnma.mongodb.net/blog?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } // require to avoid deprecation warning
);

// declare a global variable 'loggedIn' that will be accessible from all our EJS files
global.loggedIn = null;

// we specify with the wildcard *, that on all requests, this middleware should be executed
// In it, we assign loggedIn to req.session.userId
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// Client Side Controllers
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GET REQUESTS
// ‾‾‾‾‾‾‾‾‾‾‾‾‾

// rendering homepage
app.get("/", homeController);

// blogpost article page
app.get("/post/:id", getPostController);

// varify if user logged in and render create post page
app.get("/posts/new", authMiddleware, newPostController);
// Verify if the user logged in and Send a New article with title, body and image to DB
app.post("/posts/store", authMiddleware, storePostController);

// signup / register page (static)
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
// store user registration form to DB
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

// login page (static)
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
// Compare user input of login credential from DB and give access
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

// logout
app.get("/auth/logout", logoutController);

// search functionality
app.post("/query", searchPostController);

// 404 Not Found Page (Static)
// With this middleware like route, Express will go through all the routes
// and if it can't find one that matches, it will render the not found page.
app.use((req, res) => res.render("notfound"));

// Localhost
app.listen(4000, () => {
  console.log("App listening on port 4000");
});
