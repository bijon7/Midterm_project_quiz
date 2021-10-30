const express = require("express");
const { getUserScores, getQuizzes } = require("../helpers/databaseHelper");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async(req, res) => {
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

  router.get("/userScores", async(req, res)=>{
    let user = req.session["user"] || {};
    if (!user.id) {
      // User not logged in
      res.render("index", {
        isLoggedIn: false,
        user,
      });
      return;
    }

    const scores = await getUserScores(db, user.id);

    res.render("userScores", { isLoggedIn: true, user, scores: scores });

  });
  router.get("/questions", (req, res) => {
    let user = req.session["user"] || {};
    if (!user.id) {
      // User not logged in
      res.render("index", {
        isLoggedIn: false,
        user,
      });
      return;
    }

    res.render("quizQuestions", { isLoggedIn: true, user });
  });

  router.get("/privatequiz", async(req, res) => {
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

    const private = quizzes.filter((it) => it.is_private);
    res.render("privateQuizzes", {
      isLoggedIn: true,
      user,
      privateQuizzes: private,
    });
  });

  router.get("/createquiz", (req, res) => {
    let user = req.session["user"] || {};
    if (!user.id) {
      // User not logged in
      res.render("index", {
        isLoggedIn: false,
        user,
      });
      return;
    }

    res.render("createquiz", { isLoggedIn: true, user });
  });

  return router;
};
