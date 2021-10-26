CREATE TABLE QuizQuestionOptions(
    id SERIAL PRIMARY KEY NOT NULL,
    quiz_question_id INT REFERENCES QuizQuestions(id) ON DELETE CASCADE,
    "option" VARCHAR (500) NOT NULL,
    is_correct_option BOOLEAN DEFAULT false
);