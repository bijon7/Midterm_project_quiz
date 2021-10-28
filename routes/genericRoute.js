
const express = require('express');
const {
  getEntities,
  getEntityById,
  addEntity,
  editEntity,
  deleteEntity
} = require('../helpers/databaseHelper');

const router = express.Router();

module.exports = (db, tableName) => {
  // Get all Entities
  router.get("/", (req, res) => {

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    getEntities(db, tableName)
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

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    const entityId = req.params['id'];
    getEntityById(db, tableName, entityId)
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

  // Create a new entity
  router.post("/", (req, res) => {

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    const entity = req.body;
    addEntity(db, tableName, entity)
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

    editEntity(db, tableName, entity)
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

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }
    
    let entityId = req.params['id'];

    deleteEntity(db, tableName, entityId)
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
