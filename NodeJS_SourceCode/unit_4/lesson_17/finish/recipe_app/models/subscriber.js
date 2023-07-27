"use strict";

const mongoose = require("mongoose"); //define a subscriberSchema to contain name, email and zipCode properties
const subscriberSchema = new mongoose.Schema({
  name: { //require the name property 
    type: String,
    required: true
  },
  email: {//require the email property, and add the lowecase property
    type: String,
    required: true,
    lowercase: true, //means not case sensitive
    unique: true
  },
  zipCode: { //set up zipXode property with a custom error message
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

subscriberSchema.methods.getInfo = function() { //add an instance method to get the full name of a subscriber
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function() { //add an instance method to find subscribers with the same ZIP code
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec(); //access the Subscriber model to use the find method
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
