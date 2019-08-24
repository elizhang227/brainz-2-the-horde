-- CREATE DATABASE brainzv2;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    f_name varchar(100),
    l_name varchar(100),
    email varchar(500),
    password varchar(500)
);

CREATE TABLE scores
(
    id SERIAL PRIMARY KEY,
    wave INT,
    kills INT,
    user_id INT REFERENCES users(id),
    timestamp varchar
);
