\echo 'Delete and recreate news db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE news;
CREATE DATABASE news;
\connect news

DROP TABLE IF EXISTS archives;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS preferences;
DROP TABLE IF EXISTS comments

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(25),
    password TEXT NOT NULL,
    email TEXT NOT NULL 
    CHECK (position('@' IN email) > 1));

CREATE TABLE archives (
    id BIGSERIAL PRIMARY KEY,
    -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    author TEXT

);

CREATE TABLE forum (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    urlToImage TEXT,
    likes INTEGER default 0
);

CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    username TEXT NOT NULL,
    forum_art_id INTEGER REFERENCES forum(id) ON DELETE CASCADE,
    likes INTEGER default 0
)

ALTER TABLE users ADD CONSTRAINT constraintname UNIQUE (username);

-- \i news-seed.sql