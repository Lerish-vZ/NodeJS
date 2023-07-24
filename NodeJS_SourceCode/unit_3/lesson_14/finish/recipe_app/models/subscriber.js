"use strict";

const mongoose = require("mongoose"), //require mongoose
  subscriberSchema = mongoose.Schema({ //create a new schema with mongoose.Schema
    name: String,  //add schema properties
    email: String,
    zipCode: Number
  });

module.exports = mongoose.model("Subscriber", subscriberSchema); //takes a name of your choosing (Subscribers) and the schema
