const express = require("express"),
    app = express(), //instantiate the express application 
    layouts = require("express-ejs-layouts"),
    errorController = require("./controllers/errorController"),
    homeController = require("./controllers/homeController");

app.set("view engine", "ejs"); //set the application to use ejs

app.set("port", process.env.PORT || 3000);

app.use(
    express.urlencoded({ //tell the express.js app to use body-parser for processing URL-encoded and JSON parameters
        extended: false
    })
);
app.use(express.json());

app.use(layouts); //set the application to use the layout module
app.use(express.static("public")); //allows individual assets in the application to be served directly. Enables static files

app.use(errorController.pageNotFoundError); //add error handlers as middleware functions
app.use(errorController.internalServerError);

app.get("/", (req, res) => { //create a route for the home page
    res.render("index");
});

//add routes for the courses page, contact page, and contact form submission
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.listen(app.get("port"), () => { //set up the application to listen on port 3000
    console.log(`Server running at http://localhost:${app.get("port")}`);
});