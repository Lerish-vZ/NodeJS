"use strict";

const port = 3000,
  express = require("express"),
  app = express(); //assign the express application to the app constant

app.use(
  express.urlencoded({
    extended: false
  }) //tell yout Express.js application to parse URL-encoded data
);
app.use(express.json()); //analyzes incoming request bodies

app.use((req, res, next) => { 
  console.log(`request made to: ${req.url}`);
  next();
});

app.post("/", (req, res) => { //set up a POST route
  console.log(req.body); //log requests body
  console.log(req.query);
  res.send("POST Successful!");
});

app.get("/items/:vegetable", (req, res) => { //route parameters have a colon : before the parameter can exist
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => { //set up the application to listen at port 3000
  console.log(`Server running on port: ${port}`);
});
