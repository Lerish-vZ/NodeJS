"use strict";

const router = require("express").Router(),
  coursesController = require("../controllers/coursesController"); //require courses controller

router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON //add the API route to the Express.js router
);
router.use(coursesController.errorJSON); //add API error-handling middleware

module.exports = router;
