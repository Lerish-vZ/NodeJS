"use strict";

const httpStatus = require("http-status-codes"),
    contentTypes = require("./contentTypes"),
    utils = require("./utils");

    const routes = { //Create a routes object to hold route functions.
        "GET": {},
        "POST": {}
    };

    exports.handle = (req, res) => { //Create the handle function to handle requests.
        try{
            routes[req.method][req.url](req, res);
        } catch (e){
            res.writeHead(httpStatus.OK, contentTypes.html);
            utils.getFile("views/error.html", res);
        }
    };

    exports.get = (url, action) => {
        routes["GET"][url] = action;
    };

    exports.post = (url, action) => {
        routes['POST'][url] = action;
    };