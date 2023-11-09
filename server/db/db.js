const mongoose = require('mongoose')
const dotEnv = require('dotenv')
dotEnv.config();
const dburl = process.env.DB


const connectionParams = {useNewUrlParser:true,useUnifiedTopology:true}
mongoose.connect(dburl,connectionParams)
.then(()=>{console.log('connection successful')})
.catch((error)=>{console.log('connection failed',error)})