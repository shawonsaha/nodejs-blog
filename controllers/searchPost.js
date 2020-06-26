const BlogPost = require("../models/BlogPost.js"); // Database schema

module.exports = async (req, res) => {
  let query = req.body.search; // user search input
  let blogposts = await BlogPost.find({ title: query }); // query resutls return as an json array
  res.render("index", { blogposts }); // render index page with query results
};
