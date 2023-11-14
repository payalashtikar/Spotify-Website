const express = require('express')
const app = express()
const dotEnv = require('dotenv')
const cors = require('cors')
dotEnv.config()
port = process.env.PORT
// database
require('./db/db')
// models
require('./models/artistmodel')
require('./models/songmodel')
require('./models/usermodel')



// app.get('/', async (req, res) => {
//     res.send("Hello World")
// })



// middleware
app.use(express.json())
app.use(cors())
app.use(require('./routes/userRoute'))
app.use(require('./routes/songRoute'))
app.use(require('./routes/artistRoute'))



app.listen(port, (err) => {
    if (err) throw err
    console.log(`server running on port ${port}`)
})
