module.exports.getQuizzes = async(db, userId) => {
  const query = `SELECT * FROM Quizzes WHERE user_id = ${userId} OR is_private = false`;
  const res = await db.query(query);
  let quizzes = (res && res.rows) || [];
  return quizzes;
};

module.exports.getQuizById = async(db, quizId) => {
  const query = `SELECT * FROM Quizzes WHERE id = ${quizId}`;
  const res = await db.query(query);
  if (res && res.rows && res.rows.length) {
    const quiz = res[0];
    quiz.quizQuestions = await _getQuizQuestions(db, quiz.id);
    return quiz;
  }

  return null;
};

const _getQuizQuestions = async(db, quizId)=> {
  const query = `SELECT * FROM QuizQuestions WHERE quiz_id = ${quizId}`;
  const res = await db.query(query);
  const quizQuestions = (res && res.rows) || [];

  for (let quizQuestion of quizQuestions) {
    quizQuestion.quizQuestionOptions = await _getQuizQuestionOptions(db, quizQuestion.id);
  }

  return quizQuestions;
};

const _getQuizQuestionOptions = async(db, quizQuestionId)=>{
  const query = `SELECT * FROM QuizQuestionOptions WHERE quiz_question_id = ${quizQuestionId}`;
  const res = await db.query(query);
  return (res && res.rows) || [];
};
