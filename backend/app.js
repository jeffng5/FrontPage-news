const express = require('express');
const { NotFoundError } = require("./expressError");
const bcrypt = require('bcrypt')
const app = express();
const cors = require("cors")
const {BCRYPT_WORK_FACTOR} = require("./config");
const { ExpressError } = require('./expressError');
const usersRoutes = require("./routes/users");

app.use(express.json());
app.use(cors());
app.use("/users", usersRoutes);
// /** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//     return next(new NotFoundError());
//   });

// /** Generic error handler; anything unhandled goes here. */
// app.use(function (err, req, res, next) {
//     if (process.env.NODE_ENV !== "test") console.error(err.stack);
//     const status = err.status || 500;
//     const message = err.message;
  
//     return res.status(status).json({
//       error: { message, status },
//     });
//   });

const pgp = require('pg-promise')(/* options */)
const db = pgp("postgresql://jeffreyng:beachbodyp90x@127.0.0.1:5433/news")

/////////////////////////// BASIC ROUTES for register and login ///////////////////////////////
app.post('/register', async (req,res, next)=> {
    try {
        const { username, password, email } = req.body;
        console.log(req.body)
        if (!username || !password) {
            throw new ExpressError("Username and password required.")}
        const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
   
        const result = await db.query(`
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3)
        RETURNING username`, [username, hashedPwd, email]);

        const register = result
        if (register){
        await bcrypt.compare(password, hashedPwd)  
        return res.json("Logged in!")
   
          }
    }catch (e) {
        if (e.code === '23505') {
            return next(new ExpressError("Username taken. Please pick another!"))
        }
        return next(e)
    }
})

app.get('/login', async (req, res, next) => {

    try {
        const {username, password} = req.query;
        console.log(req.query)
        if (!username || !password) {
            throw new ExpressError("Username and password required.")
        }

        const results = await db.query(
        `SELECT username, password FROM users
        WHERE username = $1`, [username]);

        const user = results[0].username;
        const pwd = results[0].password;
      
        if (user) {
              if (await bcrypt.compare(password, pwd)) {
                return res.json("Logged in!")
              }
        }
        throw new ExpressError("Username or password not found/doesn't match.")
    } catch(e){
        return next(e)
    }



})
module.exports = app;