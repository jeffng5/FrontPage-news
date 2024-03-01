const express = require('express');
const { NotFoundError } = require("./expressError");
const bcrypt = require('bcrypt')
const app = express();
const cors = require("cors")
const {BCRYPT_WORK_FACTOR} = require("./config");
const { ExpressError } = require('./expressError');
const usersRoutes = require("./routes/users");
require('dotenv').config()
app.use(express.json());
app.use(cors());
app.use("/users", usersRoutes);
const { createToken } = require('./helpers/tokens')


/** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//     return next(new NotFoundError());
//   });
  
const password = process.env.PASSWORD
const PORT = process.env.DATABASE_PORT
const USER = process.env.USER

const pgp = require('pg-promise')(/* options */)
const db = pgp(`postgresql://${USER}:${password}@127.0.0.1:${PORT}/news`)

/////////////////////////// BASIC ROUTES for register and login ///////////////////////////////
app.post('/register', async (req,res, next)=> {
 
        const { username, password, email } = req.body;
        console.log(req.body)

        if (!username || !password || !email ) {
            throw new ExpressError("Username and password/email required.")}

        const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
   
        try {
        const result = await db.query(`
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3)
        RETURNING username`, [username, hashedPwd, email]);

        await bcrypt.compare(password, hashedPwd) 
            const user = result[0].username;
            const token= createToken(user)
            let ans = res.status(201).json({user, token}) 
            return ans
         }  
          catch(e) {
            // throw new ExpressError("Username taken. Please pick another!")
            next(e)
          }

})

app.get('/login', async (req, res, next) => {

    try {
        const {username, password} = req.query;
        console.log(req.query)
       
        //  {
    
            
        // }

        const results = await db.query(
        `SELECT username, password FROM users
        WHERE username = $1`, [username]);

        const user = results[0].username;
        const pwd = results[0].password;
      
        if (user && pwd) {
              if (await bcrypt.compare(password, pwd)) {
                const token = createToken(user)
                let result = res.status(201).json({user, token})
                return result
                }
        }
        if (!username || !password) {throw new ExpressError('Password and username does not match!')}
      
    } catch(e){
        next(e)
        
    }

}

)
app.use((error, req, res, next)=> {
    res.send("Password and username do not match.")
})
module.exports = app;