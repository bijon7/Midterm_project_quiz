const express = require('express');
const router = express.Router();

const {addEntity} = require('../helpers/databaseHelper');

async function _getUser(db, email, password){
    const query = `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}' LIMIT 1`;
    const res = await db.query(query);
    if (res && res.rows && res.rows.length) {
        return res.rows[0];
    }
    return null;
}

module.exports = (db) => {
  router.post("/login", async (req, res) => {
    const loginData = req.body || {};
    try {
        const user = await _getUser(db, loginData.email, loginData.password);

        if(user){
            req.session['user_id'] =  user.id;
            res.sendStatus(200);
        } else {
            req.session['user_id'] = null;
            // User not authorized
            res.sendStatus(401);
        }
    } catch (err){
        res
        .status(500)
        .json({ error: err.message });
    }
  });

  router.post("/logout", async (req, res) => {
    req.session['userId'] =  null;
  });

  // Create a new user account
  router.post("/", (req, res) => {
    const entity = req.body;
    addEntity(db, 'Users', entity)
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
  
  return router;
};
