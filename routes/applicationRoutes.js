const express = require('express');
const router = express.Router();



module.exports = () => {
  
  router.get("/", (req, res) => {
    res.render("index");
  });
      
  router.get("/questions", (req, res) => {
    res.render("quizQuestions");
  });

  return router;
};
