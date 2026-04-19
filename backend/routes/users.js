const express = require('express');
const router = express.Router();
const db = require("../db");



// route to get ID from username
router.get('/', async function (req, res, next) {
    try {
        const { username }= req.query
        
        const queryResult = await db.query(`SELECT id FROM users WHERE username= $1`, [username]);
    
        return res.status(200).json(queryResult.rows)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({error: e})
    } 
  
})

// route to post archive article into database
router.post("/frontpage", async function (req, res, next) {
    try {
        const { username, url, title, description, author } = req.body;
        if (!username || !url || !title) {
            return res.status(400).json({
                error: "username, url, and title are required",
            });
        }
        const addArticle = await db.query(
            `INSERT INTO archives (username, url, title, description, author)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, username, url, title, description, author`,
            [username, url, title, description, author]
        );
        return res.status(201).json({ article: addArticle.rows[0] });
    } catch (e) {
        console.log(e);
        return next(e);
    }
});

// GET sends username as ?username= (not req.body)
router.get("/archives", async function (req, res, next) {
    try {
        const username = req.query.username;
        if (!username || String(username).trim() === "") {
            return res.status(400).json({
                error: "username query parameter is required",
            });
        }
        const results = await db.query(
            `SELECT title, url, description, author FROM archives WHERE username = $1`,
            [username]
        );
        return res.json({ articles: results.rows });
    } catch (err) {
        return next(err);
    }
});


router.post('/forum', async function (req, res, next) {
    try {
        const {
            username,
            url,
            title,
            description,
            author,
            urlToImage,
            image,
        } = req.body;

        const imageUrl =
            urlToImage != null && String(urlToImage).trim() !== ""
                ? String(urlToImage).trim()
                : image != null && String(image).trim() !== ""
                  ? String(image).trim()
                  : null;

        const missing = [];
        if (username == null || String(username).trim() === "") {
            missing.push("username");
        }
        if (url == null || String(url).trim() === "") {
            missing.push("url");
        }
        if (title == null || String(title).trim() === "") {
            missing.push("title");
        }
        if (missing.length) {
            return res.status(400).json({
                error: `Missing required fields: ${missing.join(", ")}`,
            });
        }

        const postToForum = await db.query(
            `INSERT INTO forum (username, url, title, description, author, urlToImage)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
                String(username).trim(),
                String(url).trim(),
                String(title).trim(),
                description != null ? String(description) : null,
                author != null ? String(author) : null,
                imageUrl,
            ]
        );
        console.log(postToForum, "POST TO FORUM")
        return res.status(201).json(postToForum.rows);
    } catch (err) {
        return next(err);
    }
});

router.get('/forum', async function(req, res, next){
    try {
        const forum = await db.query(`SELECT * from forum`);
    console.log(forum.rows, "I am here too!")
    let forumArticles= forum.rows
    return res.json({forumArticles});
    }
    catch (err) { return next(err)}

}
)

router.post('/forum/comments', async function(req, res, next){
    try {
        const { username, comment, forum_art_id, datetime} = req.body
        console.log(req.body)
        const commentForum = await db.query(`INSERT into comments (username, comment, forum_art_id, datetime) VALUES ($1, $2, $3, $4) RETURNING *`, [username, comment, forum_art_id, datetime])
        console.log(res.status(201))
        let entry = commentForum.rows
        return res.status(201).json({entry})
    }
    catch (err) { return next(err) }
})

router.get('/forum/comments', async function(req, res, next){
    
    try {
        const {id} = req.query
        console.log(req.query) 
        const results = await db.query(`SELECT * from comments WHERE forum_art_id = $1`, [id]);
        let comments = results.rows
        return res.json({comments})
    } catch (err) {return next(err)
    }
})

router.post('/forum/likes', async function(req,res, next){
    try {
        const {comment} = req.body
        console.log(req.body)
        const results = await db.query(`UPDATE comments SET likes = likes+1 where comment = $1 RETURNING *`, [comment]);
        let likeAmt = results.rows;
        return res.json({likeAmt}) 
    } catch (err) {return next(err)
    }
})

router.get('/forum/likes', async function(req, res, next){
    try {
        const { comment } = req.query
        const results = await db.query(`SELECT likes from comments WHERE comment = $1`, [comment]);
        let thing = results.rows;
        return res.json({thing})
    } catch (err) { return next(err)
    }
})

module.exports = router
