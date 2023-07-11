"use strict";

//function to be used to read file contents

//import modules for usein getFile
const fs = require("fs"),
    httpStatus = reqiure("http-status-codes"),
    contentTypes = require("./contentTypes");

    module.exports = { //Export a function to read files and return a response
        getFile: (file, res) => {
            fs.readFile(`./${file}`, (error, data) => {
                if (error){
                    res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
                    res.end("There was an error serving content!");
                }
                res.end(data);
            });
        }
    };