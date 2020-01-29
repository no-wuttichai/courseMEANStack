const express = require('express')
const router = express.Router()

router.use(require('./api_member'))
router.use(require('./api_product'))

module.exports = router