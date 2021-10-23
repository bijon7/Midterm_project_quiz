CREATE TABLE QuizeResponses(
    id SERIAL PRIMARY KEY NOT NULL,
    quiz_id INT REFERENCES Quizzes(id),
    quiz_question_id INT REFERENCES QuizQuestions(id),
    user_id INT REFERENCES Users(id),
    user_answer_id INT
);