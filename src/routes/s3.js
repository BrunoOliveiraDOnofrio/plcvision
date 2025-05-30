const express = require('express');
const router = express.Router();
const s3Controller = require('../controllers/s3Controller');

router.get('/s3json', s3Controller.buscarJsonS3);

module.exports = router;