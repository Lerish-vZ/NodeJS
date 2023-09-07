const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

BlogPost.create(
  {
    title: "The Mythbuster Guide to Saving Money on Energy Bills",
    body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:",
  },
  (error, blogpost) => {
    console.log(error, blogpost);
  }
);

BlogPost.find({}, (error, blogspot) => {
  //displays all the  documents in BlogPosts
  console.log(error, blogspot);
});

BlogPost.find(
  {
    title: "The Mythbuster’s Guide to Saving Money on Energy Bills",
  },
  (error, blogspot) => {
    console.log(error, blogspot);
  }
); //query for particular title

BlogPost.find(
  {
    title: /The/,
  },
  (error, blogspot) => {
    console.log(error, blogspot);
  }
); //finds all documents with 'The' in Title. / acts like % (wildcard)

var id = ""; //get the id;

BlogPost.findById(id, (error, blogspot) => {
  //find specific doc by id
  console.log(error, blogspot);
});

BlogPost.findByIdAndUpdate(
  id,
  {
    title: "Updated title",
  },
  (error, blogspot) => {
    console.log(error, blogspot);
  }
);

BlogPost.findByIdAndDelete(id, (error, blogspot) => {
  console.log(error, blogspot);
});
