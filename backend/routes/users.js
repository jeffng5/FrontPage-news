const express = require('express');
const router = express.Router();
const db = require("../db");



// route to get ID from username
router.get('/', async function (req, res, next) {
    try {
        const username= req.query
        const id = await db.query(`SELECT id FROM users WHERE username = $1`, [username]);
    }
    catch (e) {
        console.log(e)
    }
    return id.rows[0]
})

// route to post archive article into database, accessed by helper function in frontend
router.post("/preferences", async function (req, res, next) {
    
    try {
        const {username, url, title, description, author} = req.body
        console.log(req.body)
   
        const addArticle = await db.query(`
        INSERT INTO archives (username, url, title, description, author)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`, [username, url, title, description, author] 
        )

        if (addArticle) { console.log("Archived")}
        console.log(addArticle)
        return addArticle
    } catch (e) {
        return next(e)
    }
  
})

// route to query archived articles, returns archives for that user 
router.get('/archives', async function (req, res, next) {
    try {
        const {username} = req.query
        console.log(username)
    

     
        const results = await db.query(`SELECT * FROM archives WHERE username = $1`, [username]);

        let articles = results.rows
        console.log('youve made it')
        console.log(results.rows)
        return articles
    }

    catch (err){
        return next(err)
    }
    
})




module.exports = router