const express = require("express");
// const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
// const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");
const validateMiddleware = require("./middleware/validationMiddleware");

const newPostController = require('./controllers/newPost')
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

const newUserController = require("./controllers/newUser");
const newUser = require("./controllers/newUser");

// const customMiddleWare = (req, res, next) => {
//   console.log("Custom middle ware called");
//   next();
// };
// app.use(customMiddleWare);

mongoose.connect("mongodb://127.0.0.1/my_database", { useNewUrlParser: true });

app.set("view engine", "ejs");

app.use(fileUpload());

app.use(express.static("public"));
app.use(express.json()); //in post function gets data from browser via request body attribute
app.use(express.urlencoded()); //installs body parsing middleware

app.get("/", homeController);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", getPostController);

app.get("/posts/new", newPostController);

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
app.use("/posts/store", validateMiddleware);
app.post("/posts/store", storePostController);

app.get('/auth/register', newUserController);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
