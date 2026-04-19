const express = require('express');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require("./expressError");
const bcrypt = require('bcrypt')
const app = express();
const cors = require("cors")
const {BCRYPT_WORK_FACTOR, SECRET_KEY} = require("./config");
const { ExpressError } = require('./expressError');
const usersRoutes = require("./routes/users");
require('dotenv').config()
app.use(express.json());
app.use(cors());

const authorization = (req, res, next ) => {
    if (req.originalUrl.includes("login") || req.originalUrl.includes("register") || req.originalUrl.includes("comments")){
        return next()
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });    
}

// const handleCors = (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header("Access-Control-Allow-Headers", 'Content-Type', 'Authorization');
//   next();
//  };



// app.use(handleCors)
app.use(authorization)
app.use("/users", usersRoutes);
const { createToken } = require('./helpers/tokens')


/** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//     return next(new NotFoundError());
//   });

const db = require('./db.js');


/////////////////////////// BASIC ROUTES for register and login ///////////////////////////////
app.post('/register', async (req,res, next)=> {
 
        const { username, password, email } = req.body;
        console.log(req.body)

        // if (!username || !password || !email ) {
        //     console.log("Username and password/email required")
        //     return new ExpressError("Username and password/email required")}

        const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
   
        try {
        const result = await db.query(`
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3)
        RETURNING *`, [username, hashedPwd, email]);
        const row = result.rows[0];
        const user = row.username;
            const token= createToken(user)
            let ans = res.status(201).json({user, token}) 
            console.log(ans)
            return ans
         }  
          catch(e) {
         
            next(e)
          }

})

app.get('/login', async (req, res, next) => {

    try {

        const {username, password} = req.query;
   

        const results = await db.query(
        `SELECT username, password FROM users
        WHERE username = $1`, [username]);
         
        const row = results.rows[0];
        if (!row) {
            return res.status(401).json({ error: "Username and/or password do not match" });
        }
        const user = row.username;
        const pwd = row.password;

        if (user && pwd) {
              if (await bcrypt.compare(password, pwd)) {
                const token = createToken(user)
                let result = res.status(201).json({user, token})
                return result

                }
            
            else {
                console.log('checking if this runs')
                let ans = res.status(401).json({error : 'Username and/or password do not match' })
                return ans  
                }
            }
        if (!username || !password) {throw new ExpressError('Password and username does not match!')}
        
    } catch(e){
        return res.status(400).json({error : 'Username and/or password do not match' })   
        
    }

}

)
// app.use((error, req, res, next)=> {
//     res.send("Password and username do not match.")
// })
module.exports = app;
