"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  MongoDB = require("mongodb").MongoClient, //require the MongoDB module
  dbURL = "mongodb://127.0.0.1",
  dbName = "recipe_db";

MongoDB.connect( //set up a connection to your local database server
  dbURL,
  (error, client) => {
    if (error) throw error;
    let db = client.db(dbName); //get the recipe_db database form your connection to the mongodb server
    db.collection("contacts")
      .find()
      .toArray((error, data) => { //find all records in the contacts collection
        if (error) throw error;
        console.log(data); //print the results to the console
      });

    db.collection("contacts").insert( 
      {
        name: "Freddie Mercury",
        email: "fred@queen.com"
      },
      (error, db) => { //insert a new contact into the database 
        if (error) throw error;
        console.log(db); //log the resulting errors or saved item
      }
    );
  }
);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
