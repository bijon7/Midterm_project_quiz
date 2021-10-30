const express = require('express');
const { addEntity } = require('../helpers/databaseHelper');
const router = express.Router();

module.exports = (db)=> {
  router.post('/:quizId', async(req, res)=>{

    let user = req.session['user'] || {};
    if (!user.id) {
      // User not logged in
      res.sendStatus(401);
      return;
    }

    const body = req.body || {};

    const promisses = [];
    for (let quizId in body) {
      const entit = {
        "user_id": user.id,
        "quiz_id": parseInt(req.params['quizId']),
        "quiz_question_id": parseInt(quizId),
        "user_answer_id": parseInt(body[quizId]),
      };
      promisses.push(addEntity(db, 'QuizResponses', entit));
      
    }

    await Promise.all(promisses);

    res.redirect('/userScores');

  });

  return router;
};