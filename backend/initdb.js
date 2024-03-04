const db = require('./db.js')
const fs = require('fs')

const sqlQuery = fs.readFileSync('./news.sql', 'utf8')
db.connect((err)=>{
    if (err) {
        console.error('error connecting to pg', err)
        return 
    }
    db.query(sqlQuery, (err)=>{
        if (err) {
            console.error('error creating db', err)
        }
    else {
        console.log('DB created')
    }
    db.end()
    })

})