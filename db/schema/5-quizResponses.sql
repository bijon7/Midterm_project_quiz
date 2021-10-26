CREATE TABLE QuizeResponses(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    quiz_id INT REFERENCES Quizzes(id) ON DELETE CASCADE,
    quiz_question_id INT REFERENCES QuizQuestions(id) ON DELETE CASCADE,
    user_answer_id INT
);