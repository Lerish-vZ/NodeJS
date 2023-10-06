const express = require("express");
// const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
// const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

const validateMiddleware = require("./middleware/validationMiddleware");

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");

const newUserController = require("./controllers/newUser");
const newUser = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

mongoose.connect("mongodb://127.0.0.1/my_database", { useNewUrlParser: true });

app.set("view engine", "ejs");

app.use(fileUpload());

app.use(express.static("public"));
app.use(express.json()); //in post function gets data from browser via request body attribute
app.use(express.urlencoded()); //installs body parsing middleware

global.loggedIn = null;

app.us("*", (req, res, next) => { //'*' specifies this must be done on all requests
  loggedIn = req.session.userId;
  next();
})

app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

app.get("/", homeController);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", getPostController);

app.get("/posts/new", authMiddleware, newPostController);

app.use("/posts/store", validateMiddleware);
app.post("/posts/store", authMiddleware, storePostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

app.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post("/users/login", redirectIfAuthenticatedMiddleware, loginUserController);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
