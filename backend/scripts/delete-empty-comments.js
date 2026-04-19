"use strict";

/**
 * Deletes rows in `comments` where comment is NULL, '', or only whitespace.
 * Usage: cd backend && node scripts/delete-empty-comments.js
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const db = require(path.join(__dirname, "..", "db.js"));

(async () => {
  try {
    await db.connect();
    const result = await db.query(
      `DELETE FROM comments
       WHERE comment IS NULL
          OR trim(comment) = ''`
    );
    console.log(`Deleted ${result.rowCount} empty comment(s).`);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    try {
      await db.end();
    } catch (_) {
      /* ignore */
    }
  }
})();
