CREATE TABLE QuizQuestions(
    id SERIAL PRIMARY KEY NOT NULL,
    quiz_id INT REFERENCES Quizzes(id),
    question VARCHAR (500) NOT NULL
);