"use strict";

//Add callback functions for specific routes

exports.showCourses = (req, res) => { 
    res.render("courses", {
        offeredCourses: courses //pass the courses array to the view
    });
};

exports.showSignUp = (req, res) => {
    res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};

var courses = [ //define an array of courses
    {
        title: "Event Driven Cakes",
        cost: 50
    },
    {
        title: "Asynchronous Artichoke",
        cost: 25
    },
    {
        title: "Object Oriented Orange Juice",
        cost: 10
    }
]; 
