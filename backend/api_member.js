const express = require('express')
const router = express.Router()
const User = require('./models/user')
const bcryptjs = require('bcryptjs')

router.post('/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body
        password = bcryptjs.hash(password, 8)
        let result = await User.create({ username, password })
        res.json({ result: result, message: "Register Successfully" })
    } catch (error) {
        res.status(res.statusCode).json({ result: error, message: "Failure" })
    }
})

router.post('/auth/login', (req, res) => { })

module.exports = router