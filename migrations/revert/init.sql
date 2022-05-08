-- Revert idiomasse:init from pg

BEGIN;

DROP TABLE user_know_word, word, "type", "language", "user" CASCADE;

COMMIT;
