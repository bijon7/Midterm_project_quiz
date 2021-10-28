const express = require('express');
const router = express.Router();

const {
  getQuizzes,
  getQuizById
} = require('../helpers/quizDatabaseHelper');

const {
  addEntity,
  editEntity,
  deleteEntity
} = require('../helpers/databaseHelper');


module.exports = (db) => {
  // Get all Quizzes
  router.get("/", (req, res) => {

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    getQuizzes(db, user.id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Get one Quiz by Id
  router.get("/:id", (req, res) => {

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    const entityId = req.params['id'];
    getQuizById(db, entityId)
      .then(data => {
        if (data) {
          res.json(data);
        } else {
          res.sendStatus(204);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Create a new Quiz
  router.post("/", (req, res) => {

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    const entity = req.body;
    addEntity(db, 'Quizzes', entity)
      .then(data => {
        if (data) {
          res.status(201).json(data);
        } else {
          res.sendStatus(204);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Edit an entity
  router.patch("/", (req, res) => {

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    const entity = req.body;

    editEntity(db, "Quizzes", entity)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE an entity
  router.get("/delete/:id", (req, res) => {

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    let entityId = req.params['id'];

    deleteEntity(db, "Quizzes", entityId)
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
