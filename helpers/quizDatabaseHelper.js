module.exports.getQuizzes = async (db, userId) => {
    const query = `SELECT * FROM Quiz WHERE user_id = ${userId} OR is_private = 0`;
    const res = await db.query(query);
    var quizzes = res?.rows || [];
    return quizzes;
}

module.exports.getQuizById = async (db, quizId) => {
    const query = `SELECT * FROM Quiz WHERE id = ${quizId}`;
    const res = await db.query(query);
    if(res && res.rows && res.rows.length){
        const quiz = res[0];
        quiz.quizQuestions = await _getQuizQuestions(db, quiz.id)
        return quizl
    }

    return null;
}

async function  _getQuizQuestions (db, quizId) {
    const query = `SELECT * FROM QuizQuestions WHERE quiz_id = ${quizId}`;
    const res = await db.query(query);
    const quizQuestions = res?.rows || [];

    for(let quizQuestion of quizQuestions){
        quizQuestion.quizQuestionOptions = await _getQuizQuestionOptions(db, quizQuestion.id)
    }

    return quizQuestions;
}

async function _getQuizQuestionOptions(db, quizQuestionId, ){
    const query = `SELECT * FROM QuizQuestionOptions WHERE quiz_question_id = ${quizQuestionId}`;
    const res = await db.query(query);
    return res?.rows || [];
}
