const express = require('express')
const router = express.Router()
const User = require('./models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('./jwt')

router.post('/auth/register', async (req, res) => {
    try {
        let { username, password } = req.body
        password = await bcryptjs.hash(password, 8)
        let result = await User.create({ username, password })
        res.json({ result: result, message: "Register Successfully" })
    } catch (error) {
        res.status(500).json({ result: error, message: "Failure" })
    }
})

router.post('/auth/login', async (req, res) => {
    try {
        let { username, password } = req.body
        const result = await User.findOne({ username })
        if (!result) {
            return res.status(401).json({ token: "", message: "Username Invalide" })
        }
        const passwordValid = await bcryptjs.compare(password, result.password)
        if (!passwordValid) {
            return res.status(401).json({ token: "", message: "Password Invalide" })
        }
        const payload = {
            id: result._id,
            role: result.role,
            username: result.username,
            department: 'IT'
        }
        res.json({ token: jwt.sign(payload), message: "Login Successfully" })
    } catch (error) {
        res.status(500).json({ token: "", message: error })
    }
})

module.exports = router