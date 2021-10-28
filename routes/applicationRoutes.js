const express = require("express");
const router = express.Router();
const { getQuizzes } = require("../helpers/quizDatabaseHelper");

module.exports = (db) => {
  router.get("/", async (req, res) => {
    let user = req.session["user"] || {};
    if (!user.id) {
      // User not logged in
      res.render("index", {
        isLoggedIn: false,
        user,
        privateQuizzes: [],
        publicQuizzes: [],
      });
      return;
    }

    const quizzes = await getQuizzes(db, user.id);

    const public = quizzes.filter((it) => !it.is_private);
    const private = quizzes.filter((it) => it.is_private);
    res.render("index", {
      isLoggedIn: true,
      user,
      privateQuizzes: private,
      publicQuizzes: public,
    });
  });

  router.get("/questions", (req, res) => {
    res.render("quizQuestions");
  });

  router.get("/privatequiz", async (req, res) => {
    let user = req.session["user"] || {};
    if (!user.id) {
      // User not logged in
      res.render("index", {
        isLoggedIn: false,
        user,
        privateQuizzes: [],
        publicQuizzes: [],
      });
      return;
    }

    const quizzes = await getQuizzes(db, user.id);

    const public = quizzes.filter((it) => !it.is_private);
    const private = quizzes.filter((it) => it.is_private);
    res.render("privateQuizzes", {
      isLoggedIn: true,
      user,
      privateQuizzes: private,
      publicQuizzes: public,
    });
  });

  router.get("/createquiz", (req, res) => {
    res.render("createquiz");
  });

  return router;
};
