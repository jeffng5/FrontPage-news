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

CREATE TABLE preferences (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    preferences TEXT NOT NULL
)