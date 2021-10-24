Create TABLE Quizzes(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES Users(id),
    title VARCHAR (100) NOT NULL,
    "description" VARCHAR (500),
    is_private BOOLEAN DEFAULT false
);