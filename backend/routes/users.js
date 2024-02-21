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

// route to post archive article into database, accessed by helper function in frontend
router.post("/frontpage", async function (req, res, next) {
    
    // try {
        const {username, url, title, description, author} = req.body
        console.log(req.body)
        
        const test = await db.query(`select username, url FROM archives WHERE username = $1 AND url = $2`, [username, url])
       
        if (test) 
        { return console.log("YES IT HAS BEGUN")
                }
        else {
        const addArticle = await db.query(`
        INSERT INTO archives (username, url, title, description, author)
        VALUES ($1, $2, $3, $4, $5)`, [username, url, title, description, author]) 
        
      
        let result = addArticle.rows
        console.log(result)
        return res.status(201).json({ result })}}
    //  catch (e) {
    //     return next(e)
    // }
  
)

// route to query archived articles, returns archives for that user 
router.get('/archives', async function (req, res, next) {
    try {
        let { username } = req.query
        const results = await db.query(`SELECT title, url, description, author FROM archives WHERE username = $1`, [username]);

        let articles = results.rows;
        console.log('youve made it');
        console.log(articles);
        return res.json({articles});
    }
    catch (err){
        return next(err)
    }  
})


router.post('/forum', async function (req, res, next) {
    try {
        const { username, url, title, description, author, urlToImage}= req.body
    const postToForum = await db.query(`INSERT into forum (username, url, title, description, author, urlToImage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [username, url, title, description, author, urlToImage])
    if (postToForum) {
        console.log('Forum article POSTED!')}
    return res.status(201).json(postToForum.rows)   
    
}
    catch (err) { return next(err)}

})

router.get('/forum', async function(req, res, next){
    try {
        const forum = await db.query(`SELECT * from forum`);
    console.log(res.rows, "I am here too!")
    let forumArticles= forum.rows
    return res.json({forumArticles});
    }
    catch (err) { return next(err)}

}
)

router.post('/forum/comments', async function(req, res, next){
    try {
        const { username, comment, forum_art_id} = req.body
        console.log(req.body)
        const commentForum = await db.query(`INSERT into comments (username, comment, forum_art_id) VALUES ($1, $2, $3) RETURNING *`, [username, comment, forum_art_id])
        console.log(res.status(201))
        return res.status(201).json(commentForum.rows)
    }
    catch (err) { return next(err) }
})

router.get('/forum/comments', async function(req, res, next){
    
    try {
        const {id} = req.query
        console.log(req.query) 
        const results = await db.query(`SELECT * from comments WHERE forum_art_id = $1`, [id]);
        let comments = results.rows
        console.log(comments, 'I am fetching comments')
        return res.json({comments})
    } catch (err) {return next(err)
    }
})



module.exports = router