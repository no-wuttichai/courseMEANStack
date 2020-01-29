const express = require('express')
const router = express.Router()
require('./db')

router.use(require('./api_member'))
router.use(require('./api_product'))

module.exports = router