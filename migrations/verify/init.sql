-- Verify idiomasse:init on pg

BEGIN;

SELECT * FROM user_know_word WHERE false;
SELECT * FROM word WHERE false;
SELECT * FROM "type" WHERE false;
SELECT * FROM "language" WHERE false;
SELECT * FROM "user" WHERE false;
ROLLBACK;
