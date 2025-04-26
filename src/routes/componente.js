const express = require('express')
const router = express.Router()
const controller = require('../controllers/componenteController')

router.get('/', (req, res) => controller.get(req, res))


module.exports = router

