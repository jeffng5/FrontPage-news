-- \echo 'Delete and recreate news db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE news;
-- CREATE DATABASE news;
-- use news

-- DROP TABLE IF EXISTS archives;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS preferences;
-- DROP TABLE IF EXISTS comments;
-- DROP TABLE IF EXISTS forum;

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL 
    CHECK (position('@' IN email) > 1));

CREATE TABLE IF NOT EXISTS archives (
    id BIGSERIAL PRIMARY KEY,
    -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    author TEXT

);

CREATE TABLE IF NOT EXISTS forum (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    urlToImage TEXT,
    likes INTEGER default 0
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    username TEXT NOT NULL,
    forum_art_id INTEGER REFERENCES forum(id) ON DELETE CASCADE,
    likes INTEGER default 0
);

ALTER TABLE users DROP CONSTRAINT IF EXISTS constraintname
ALTER TABLE users ADD CONSTRAINT constraintname UNIQUE (username);
ALTER TABLE comments ADD COLUMN IF NOT EXISTS datetime timestamp with time zone;

-- \i news-seed.sql