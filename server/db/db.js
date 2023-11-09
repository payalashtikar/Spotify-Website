const mongoose = require('mongoose')
const dotEnv = require('dotenv')
dotEnv.config();
const dburl = process.env.DB
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const User = require('../models/usermodel')
const secretKey = process.env.SecretKey;



const connectionParams = {useNewUrlParser:true,useUnifiedTopology:true}
mongoose.connect(dburl,connectionParams)
.then(()=>{console.log('connection successful')})
.catch((error)=>{console.log('connection failed',error)})



// PASSPORT SETUP
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            // user exist or not
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));