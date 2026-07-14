INSERT INTO "reading_list" ("user_id", "blog_id")
SELECT "user_id", "id" FROM "blogs"
ON CONFLICT ("user_id", "blog_id") DO NOTHING;
