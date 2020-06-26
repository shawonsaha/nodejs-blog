const BlogPost = require("../models/BlogPost.js"); // Database schema
const path = require("path"); // to use absolute path '__direname'

module.exports = async (req, res) => {
  // req.files.image object contains certain properties like mv
  // a function to move the file elsewhere on your server and name
  let image = req.files.image;
  // image.mv moves the uploaded file to public/img directory
  // with the name from image.name
  // the following method is an asynchronous call
  image.mv(
    path.resolve(__dirname, "..", "public/img", image.name),
    async (error) => {
      // ... is called Spread syntax (...) It helps to join req.body with second argument
      await BlogPost.create({ ...req.body, image: "/img/" + image.name }); // will await the completion of the current line before the below line can be executed
      //console.log(req.body); // req.body is JSON format of your new post { title: 'Your Title', body: 'Your Body' }
      res.redirect("/"); // after creating new blogpost rediret to homepage
    }
  );
};
