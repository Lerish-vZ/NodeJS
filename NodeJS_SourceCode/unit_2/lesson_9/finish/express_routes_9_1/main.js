"use strict";

const port = 3000,
  express = require("express"),
  app = express();

app.use((req, res, next) => { //define a middleware function
  console.log(`request made to: ${req.url}`); //log the request's path to console
  next(); //call the next function
});

app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
