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
// app.get('/',(req,res)=>{res.render('index')})

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

// UPLOADING IMAGE
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// install a package express-fileupload to help upload files in Express
// https://www.npmjs.com/package/express-fileupload for the complete list of what it contains
// npm install --save express-fileupload
// const fileUpload = require('express-fileupload')
// app.use(fileUpload())

// Middleware
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// next() tells Express that the middleware is done and Express should call the  next middleware function.
// If you remove next() and go to your app in the browser, the app will hang
// as you have not told Express to proceed on to the next middleware function.
// All middlewares called by app.use calls next()
// Example:

// const customMiddleWare = (req, res, next) => {
//   console.log("Custom middle ware called");
//   next();
// };

// app.use(customMiddleWare);

// Now each time you refresh your app, the message 'Custom middle ware called' will be logged in the console

// Password Encryption
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// install a package called bcrypt (https://www.npmjs.com/package/bcrypt) to help us hash passwords
// Install it using: npm i --save bcrypt
// Then add/require this module in User.js (DB model)

// REFACTORING TO MVC
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Model represents the structure of the data, the format and the constraints with which it is stored.
// In essence, it is the database part of the application.
// View is what is presented to the user. Views make use of the Model and present data in a manner which the user wants.
// From the view, user can make changes to the data presented to them. In our app, the View consist of static or dynamic pages
// rendered to users. The pages are stored in a views folder storing various EJS files to render static and dynamic HTML websites.
// Controller which controls the requests of the user and then generates appropriate response rendered back to the user.
// That is, a user interacts with the View which generates the appropriate request which is handled by the Controller
// which then renders the appropriate view with the Model data as a response

// User Model
// ‾‾‾‾‾‾‾‾‾‾‾‾
// For user registration, we need a user model to represent our Users collection just as what we had for BlogPost.
// In models folder, create a new file User.js and copy/edit contents from BlogPost.js to create the User schema:

// Compare Password
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// To compare passwords, we use bcrypt.compare to compare the entered password with the hashed user password
// retrieved from our database. Note that we use bcrypt.compare instead of a equality check e.g. ===.
// This is to keep us safe from a hacker trick called a timing attack

// USER AUTHENTICATION WITH EXPRESS SESSIONS
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Sessions are how we keep the user logged into our web app by keeping their information in the browser
// install a middleware package called express-session (https://github.com/expressjs/session)
// npm install --save express-session
// When you log in to your app and get to the home page, you will see that the
// session has cookie data with userId information e.g.:
// Session {
//   cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
//   userId: '5efb2a9cf214340c804d45b2'
// }
// userId will be shared within the server and browser. Thus, in each request,
// the server will know if the user is logged in or not

// Protecting Pages with Authentication Middleware
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Now that we have authentication, we will protect pages that we don't want
// assessed by users not logged in. For example, we only want logged in users
// to access the ‘ post new ’ page.First, we create a custom middleware in /middleware/authMiddleware.js

// Conditionally Display New Post, Login and New User links
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// other than redirecting to the home page whenever a logged in user clicks
// on Login or ‘ new user ’ , we should hide the new user and login links if a user is already logged in
