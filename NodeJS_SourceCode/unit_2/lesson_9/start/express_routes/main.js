"use strict";

const port = 3000, //assign the port 
  express = require("express"), //import the express module
  app = express(); //assign the express module to the app constant

//////////////////////////////////9.1////////////////////////////////////////

  /////////////////////9_1/////////////////////

  // app.post("/contact", (req, res) => { //handle requests with the Express.js post method
  //   res.send("Contact information submitted successfully."); 
  // })

  ///////////////////9_2//////////////////////

  // app.get("/items/:vegetable", (req, res) => { //respond with path parameters
  //   res.send(req.params.vegetable); 
  // });

  //////////////////9_3/////////////////////

  // app.get("/items/:vegetable", (req, res) => { //add a route to get URL parameters
  //   let veg = req.params.vegetable; //the vegetable is a parameter in the URL, a colon must be in font of the parameter
  //   res.send(`This is the page for ${veg}`);
  // });

/////////////////////9_4///////////////////

// app.use((req, res, next) => { //define a middleware function
//   console.log(`request made to: ${req.url}`); //log the request's path to the console
//   next(); //call the next function
// }); //has to be first

// app.get("/items/:vegetable", (req, res,) => { 
//   let veg = req.params.vegetable; 
//   res.send(`This is the page for ${veg}`);
// });

//////////////////////////////////////9.2////////////////////////////////////

////////////////////9_5/////////////////// HELP

// app.use(
//   express.urlencoded({
//     extended: false
//   })
// ); //Tell your Express.js application to parse URL-encoded data

// app.use(express.json());

// app.post("/", (req, res) => {
//   console.log(req.body);
//   console.log(req.query);
//   res.send("POST Successful!");
// });

///////////////////////////////////9.3///////////////////////////////////////

//NEW FOLDER 

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  })