// Defining a Model using mongoose
// This folder (models) contain models which are objects that represent collections in our database

const mongoose = require("mongoose");

// A schema represents how a collection looks like
const Schema = mongoose.Schema;
// each document in the collection would have the fields specified in the schema
const BlogPostSchema = new Schema({
  title: String,
  body: String,
});

// We access the database via mongoose.model. The first argument is the singular name of the collection your model is for
// Mongoose automatically looks for the plural version of your model name.
// In our case, because we use BlogPost, Mongoose will create the model for our 'BlogPosts' collection, not BlogPost collection.
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

// we export the BlogPost variable so that when other files require this file, they know to grab BlogPost.
// Note that you can export only one variable
module.exports = BlogPost;
