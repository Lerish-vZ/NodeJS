const mongoose = require("mongoose"); //import mongoose 

const Category = mongoose.model( 
  "Category",
  new mongoose.Schema({
    name: String,
    description: String,
  })
);

module.exports = Category;
