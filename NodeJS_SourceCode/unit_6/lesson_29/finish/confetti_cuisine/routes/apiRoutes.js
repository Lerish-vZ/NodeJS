"use strict";

const router = require("express").Router(), //require the Express.js router and coursesController
  coursesController = require("../controllers/coursesController");

router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON 
); //create a route for the courses data endpoint 
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON); //create a route to join a course by ID
router.use(coursesController.errorJSON); //handle all API errors

module.exports = router;
