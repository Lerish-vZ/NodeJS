"use strict";

const Course = require("../models/course"),
  httpStatus = require("http-status-codes"),
  User = require("../models/user"),
  getCourseParams = body => {
    return {
      title: body.title,
      description: body.description,
      maxStudents: body.maxStudents,
      cost: body.cost
    };
  };

module.exports = {
  index: (req, res, next) => {
    Course.find()
      .then(courses => {
        res.locals.courses = courses;
        next();
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("courses/index");
  },

  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.render("courses/edit", {
          course: course
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = getCourseParams(req.body);

    Course.findByIdAndUpdate(courseId, {
      $set: courseParams
    })
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },
  respondJSON: (req, res) => { //return a courses array through the data property 
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
  errorJSON: (error, req, res, next) => { //return an error message and status code of 500 if an error occurs
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  filterUserCourses: (req, res, next) => { //check whether the user is logged in and return an array of courses with joined property reflecting user association
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedCourses = res.locals.courses.map(course => {
        let userJoined = currentUser.courses.some(userCourse => {
          return userCourse.equals(course._id);
        });
        return Object.assign(course.toObject(), { joined: userJoined });
      });
      res.locals.courses = mappedCourses;
      next();
    } else {
      next();
    }
  },
  join: (req, res, next) => {
    let courseId = req.params.id,
      currentUser = req.user; //define local variables for course and user IDs
    if (currentUser) { //check whether the user is logged in
      User.findByIdAndUpdate(currentUser, { //find and update the user to connect the selected course
        $addToSet: {
          courses: courseId
        }
      })
        .then(() => {
          res.locals.success = true;
          next(); //continue to next middleware 
        })
        .catch(error => {
          next(error); //continue to error middleware with an error message if the user failed to enroll
        });
    } else {
      next(new Error("User must log in."));
    }
  }
};
