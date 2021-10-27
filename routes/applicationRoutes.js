const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/questions", (req, res) => {
    res.render("quizQuestions");
  });

  router.get("/privatequiz", (req, res) => {
    res.render("privateQuizzes");
  });

  router.get("/createquiz", (req, res) => {
    res.render("createquiz");
  });

  return router;
};
