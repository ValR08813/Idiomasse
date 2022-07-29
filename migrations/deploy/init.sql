-- Deploy idiomasse:init to pg

BEGIN;

CREATE TABLE "user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  mail TEXT NOT NULL UNIQUE,
  lastname TEXT NOT NULL,
  firstname TEXT NOT NULL,
  pseudo  TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL UNIQUE
);


-- CREATE TABLE "language" (
--   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   "name" TEXT NOT NULL UNIQUE
  
-- );


CREATE TABLE word (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "text" TEXT NOT NULL UNIQUE,
  "language" TEXT NOT NULL,
  trad TEXT NOT NULL,
  article TEXT NOT NULL
);


CREATE TABLE user_know_word (
  user_id INT NOT NULL REFERENCES "user"(id),
  word_id INT NOT NULL REFERENCES word(id)
);


COMMIT;
