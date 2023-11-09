const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
const { getToken } = require('../utils/getToken');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Checking if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Creating new user
        const hashPassword = await bcrypt.hash(password, 10);
        const newUserData = { name, email, password: hashPassword };
        const newUser = await User.create(newUserData);
        // Creating and attaching token to the response
        const token = await getToken(email, newUser);
        const userReturn = { ...newUser.toJSON(), token };
        delete userReturn.password;
        return res.status(200).json({ message: "New user created", userReturn });
    } catch (error) {
        return res.status(400).json({ error: "Registration failed", details: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        // get email, password
        const { email, password } = req.body;
        // check if user is exist or not
        const user = await User.findOne({ email: email })
        if (!user) {
            console.log('invalid user')
            return res.status(400).json({ error: 'Invalid user' })
        }
        // check password correct or not
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('invalid password')
            return res.status(400).json({ error: 'Incorrect Password!' })
        }
        // create a token for this user
        const token = await getToken(user.email, user);
        // creadentials correct , then return token to the user
        const userReturn = { ...newUser.toJSON(), token };
        delete userReturn.password;
        console.log(userReturn)
        return res.status(200).json({ message: "login success", userReturn });
    }
    catch (err) {
        return res.status(400).json({ error: "login failed", details: err.message });

    }
})


module.exports = router;
