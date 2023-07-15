"use strict";

const port = 3000,
    express = require("express"),
    app = express(),
    homeController = require("./Controllers/homeController");

/////////////////////////////////////9.3/////////////////////////////////////

////////9_7////////

app.get("/items/:vegetable", homeController.sendReqParam); //handle GET requests to "/items/:vegetable"

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});