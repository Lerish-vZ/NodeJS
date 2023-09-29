const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require('./models/BlogPost')

mongoose.connect("mongodb://127.0.0.1/my_database", { useNewUrlParser: true });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json()); //in post function gets data from browser via request body attribute
app.use(express.urlencoded()); //installs body parsing middleware

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render("index", { //pass back blogposts data to client browser by providing it as the 2nd argument to render
    blogposts
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render("post", {
    blogpost
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", async (req, res) => { //used to create records on server
  //model creates a new doc with browser data
 await BlogPost.create(req.body) 
  .then((blogpost) => {
    res.redirect("/"); 
  }) //req.body has the browser form data
  
  .catch((error) => {
    console.log(error);
  });
 });

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
