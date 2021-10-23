Create TABLE Users(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    "password" VARCHAR(50) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50)
);