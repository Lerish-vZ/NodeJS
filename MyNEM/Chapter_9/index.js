const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");

const newPostController = require('./controllers/newPost');

const customMiddleWare = (req, res, next) => {
  console.log("Custom middle ware called");
  next();
};
app.use(customMiddleWare);

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect("/posts/new");
  }
  next();
};


mongoose.connect("mongodb://127.0.0.1/my_database", { useNewUrlParser: true });

app.set("view engine", "ejs");

app.use(fileUpload());

app.use("/posts/store", validateMiddleWare);

app.use(express.static("public"));
app.use(express.json()); //in post function gets data from browser via request body attribute
app.use(express.urlencoded()); //installs body parsing middleware

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", {
    //pass back blogposts data to client browser by providing it as the 2nd argument to render
    blogposts,
  });
});


app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", {
    blogpost,
  });
});

app.get('/posts/new', newPostController);



app.listen(3000, () => {
  console.log("App listening on port 3000");
});
