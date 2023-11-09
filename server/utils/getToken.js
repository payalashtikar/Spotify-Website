const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv') 
dotEnv.config();
const secretKey = process.env.SecretKey;

exports ={}

exports.getToken = async(email,user) =>{
    const token = jwt.sign({identifier : user._id},secretKey);
    return token;
}

module.exports = exports