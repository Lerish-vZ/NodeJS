const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost:27017/my_database", { useNewUrlParser: true });

mongoose.Promise = global.Promise; //pasted
// BlogPost.create(
//   {
//     title: "The Mythbuster Guide to Saving Money on Energy Bills",
//     body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:",
//   },
//   (error, blogpost) => {
//     console.log(error, blogpost);
//   }
// );

BlogPost.create({
  title: "The Mythbuster Guide to Saving Money on Energy Bills",
  body:
    "If you have been here a long time, you might remember when I " +
    "went on ITV Tonight to dispense a masterclass in saving money on energy " +
    "bills. Energy-saving is one of my favourite money topics, because once " +
    "you get past the boring bullet-point lists, a whole new world of thrifty " +
    "nerdery opens up. You know those bullet-point lists. You start spotting " +
    "them everything at this time of year. They go like this:",
})
  .then((blogspot) => {
    console.log("Successfully found \n" + blogspot); //\n makes new line
  })
  .catch((error) => {
    console.log("Failed to find \n" + error);
  });

BlogPost.find({})
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.log(error);
  });

BlogPost.find({
  title: "The Mythbuster’s Guide to Saving Money on Energy Bills",
})
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.log(error);
  }); //query for particular title

BlogPost.find({
  title: /The/,
})
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.log(error);
  }); //finds all documents with 'The' in Title. / acts like % (wildcard)

var id = "5cb436980b33147489eadfbb"; //get the id;

BlogPost.findById(id)
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.log(error);
  });

BlogPost.findByIdAndUpdate(id, {
  title: "Updated title",
})
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.log(error);
  });

BlogPost.findByIdAndDelete({ id })
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.log(error);
  });
