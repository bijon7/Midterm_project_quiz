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

    let userId = req.session['user_id'] || 0;
    if(userId < 1){
      // User not logged in
      res.sendStatus(401);
      return;
    }

    getQuizzes(db, userId)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Get one Item by Id
  router.get("/:id", (req, res) => {

    let userId = req.session['user_id'] || 0;
    if(userId < 1){
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

    let userId = req.session['user_id'] || 0;
    if(userId < 1){
      // User not logged in
      res.sendStatus(401);
      return;
    }

    const entity = req.body;
    addEntity(db, 'Quizzes', entity)
      .then(data => {
        if (data) {
          res.status(201).json(data);
        }
        else {
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

    let userId = req.session['user_id'] || 0;
    if(userId < 1){
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
  router.delete("/:id", (req, res) => {

    let userId = req.session['user_id'] || 0;
    if(userId < 1){
      // User not logged in
      res.sendStatus(401);
      return;
    }

    let entityId = req.params['id'];

    deleteEntity(db, "Quizzes", entityId)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
