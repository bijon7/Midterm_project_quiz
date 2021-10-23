CREATE TABLE QuizQuestionOptions(
    id SERIAL PRIMARY KEY NOT NULL,
    quiz_question_id INT REFERENCES QuizQuestions(id),
    "option" VARCHAR (500) NOT NULL
);