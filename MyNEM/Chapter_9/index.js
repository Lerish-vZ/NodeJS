const express = require("express");
// const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
// const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

const customMiddleWare = (req, res, next) => {
  console.log("Custom middle ware called");
  next();
};
app.use(customMiddleWare);

// const validateMiddleWare = (req, res, next) => {
//   if (req.files == null || req.body.title == null) {
//     return res.redirect("/posts/new");
//   }
//   next();
// };

mongoose.connect("mongodb://127.0.0.1/my_database", { useNewUrlParser: true });

app.set("view engine", "ejs");

app.use(fileUpload());

app.use(express.static("public"));
app.use(express.json()); //in post function gets data from browser via request body attribute
app.use(express.urlencoded()); //installs body parsing middleware

// app.get("/", async (req, res) => {
//   const blogposts = await BlogPost.find({});
//   res.render("index", {
//     //pass back blogposts data to client browser by providing it as the 2nd argument to render
//     blogposts,
//   });
// });
app.get("/", homeController);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// app.get("/post/:id", async (req, res) => {
//   const blogpost = await BlogPost.findById(req.params.id);
//   res.render("post", {
//     blogpost,
//   });
// });
app.get("/post/:id", getPostController);

// app.get("/posts/new", (req, res) => {
//   res.render("create");
// });
app.get("posts/new", newPostController);

// app.post("/posts/store", (req, res) => {
//   let image = req.files.image;
//   image
//     .mv(path.resolve(__dirname, "public/img", image.name))
//     .then(() => BlogPost.create({ ...req.body, image: "/img/" + image.name }))
//     .then((BlogPost) => {
//       res.redirect("/");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
app.use("/posts/store", validateMiddleWare);
app.post("/posts/store", storePostController);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
