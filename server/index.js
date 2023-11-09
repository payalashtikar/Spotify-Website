const express = require('express')
const app = express()
const dotEnv = require('dotenv')
dotEnv.config()
port = process.env.PORT
// database
require('./db/db')
// models
require('./models/artistmodel')
require('./models/songmodel')
require('./models/usermodel')



app.get('/', async (req, res) => {
    res.send("Hello World")
})




app.listen(port, (err) => {
    if (err) throw err
    console.log(`server running on port ${port}`)
})
