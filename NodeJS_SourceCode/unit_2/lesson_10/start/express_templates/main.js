"use strict";

const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  ////////////////////////////10.3////////////////////////
  layouts = require("express-ejs-layouts");

////////////////////////////////////10.1/////////////////////////////////////

app.set("view engine", "ejs"); //how application knows to expect ejs in views folder

//////10_1//////

//app.get("/name", homeController.respondWithName); //calls the function respondWithName in the homeControllers file

////////////////////////////////////10.3/////////////////////////////////////

app.use(layouts); //let's express.js know to use this package as an additonal middleware layer

////////////////////////////////////10.2/////////////////////////////////////
//////10_3//////

app.get("/name/:myName", homeController.respondWithName); //your route now has a parameter at the end of the /name path




app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.get("/items/:vegetable", homeController.sendReqParam);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
