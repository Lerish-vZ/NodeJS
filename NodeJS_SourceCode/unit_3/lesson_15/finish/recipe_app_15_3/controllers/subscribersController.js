"use strict";

const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res) => { //rewrite the getAllSubscribers action
  Subscriber.find({})
    .exec() //return a promise from the find query
    .then(subscribers => { //send saved data to the next then code block
      res.render("subscribers", {
        subscribers: subscribers
      }); //save results from the database
    })
    .catch(error => { //catch errors that are rejected in the promise
      console.log(error.message);
      return [];
    }) 
    .then(() => { //end the promise chain with a log message
      console.log("promise complete");
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};


exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });

  //exec isn't needed in the following promise
  newSubscriber
    .save()
    .then(result => { //save a new subscriber with a promise return
      res.render("thanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
