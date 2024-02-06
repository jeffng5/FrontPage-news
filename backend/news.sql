\echo 'Delete and recreate news db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE news;
CREATE DATABASE news;
\connect news

DROP TABLE archives;
DROP TABLE users;
DROP TABLE preferences;

ALTER TABLE users ADD CONSTRAINT constraintname UNIQUE (username);

\i /Users/jeffreyng/news-aggregator-capstone2/backend/news-schema.sql;
-- \i news-seed.sql