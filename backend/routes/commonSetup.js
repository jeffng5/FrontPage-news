
const bcrypt = require("bcrypt")
const db = require("../db.js")
const { BCRYPT_WORK_FACTOR } = require("../config")


async function BeforeEach() {
     
    await db.query("DELETE FROM users");
  
    await db.query("DELETE FROM archives");

    await db.query(`INSERT INTO users(username, password, email) VALUES ('TedWilliams', $1, 'ted.williams@baseball.com') RETURNING username`, 
    [await bcrypt.hash('password1', BCRYPT_WORK_FACTOR) ])

    await db.query(`INSERT INTO archives (username, url, title, description, author) VALUES (
        'TedWilliams',
        'www.Jimmy.com"\',
        'baseballLegend',
        'cooperstown',
        'Babe Ruth') RETURNING *
    `)
}

// async function BeforeEach() {
//     await db.query("BEGIN");
//   }
  
  async function AfterEach() {
    await db.query("ROLLBACK");
  }
  

async function AfterAll(){
    await db.end(); 
}
module.exports = {
 
    AfterAll,
    BeforeEach,
    AfterEach
}