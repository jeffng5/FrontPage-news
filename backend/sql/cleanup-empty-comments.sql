-- Remove comments that are null, empty, or only whitespace.
-- Run: psql "$DATABASE_URL" -f sql/cleanup-empty-comments.sql
--   or: npm run delete-empty-comments (from backend/)

DELETE FROM comments
WHERE comment IS NULL
   OR trim(comment) = '';
