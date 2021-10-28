const express = require('express');
const router = express.Router();

const {addEntity, getUser} = require('../helpers/databaseHelper');



module.exports = (db) => {
  router.post("/login", async(req, res) => {
    const loginData = req.body || {};
    try {
      const user = await getUser(db, loginData.email, loginData.password);

      if (user) {
        req.session['user'] =  user;
      } else {
        // User not authorized
        req.session['user'] = null;
      }

      res.redirect('/');
    } catch (err) {
      res
        .status(500)
        .json({ error: err.message });
    }
  });

  router.get("/logout", async(req, res) => {
    req.session['user'] =  null;
    res.redirect('/');
  });

  router.post("/logout", async(req, res) => {
    req.session['user'] =  null;
    res.redirect('/');
  });


  // Create a new user account
  router.post("/", (req, res) => {
    const entity = req.body;
    addEntity(db, 'Users', entity)
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
  
  return router;
};
