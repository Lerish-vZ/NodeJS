const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (req, res) => { //respond with a 404 status code
    let errorCode = httpStatus.NOT_FOUND; 
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, { //send content in 404.html
        root: "./"
    })
    res.send(`${errorCode} | The page does not exist!`);
};

exports.respondInternalError = (error, req, res, next) => { //catch all errors and respond with a 500 status code
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;  
    console.log(`ERROR occured: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};

// exports.logErrors = (error, req, res, next) => { //add middleware to handle errors 
//     console.error(error.stack); //log the error stack (tells you what went wrong)
//     next(error); //pass the error to the next middleware function
// } //needs four arguments to handle error as error handling middleware not just a middleware function
