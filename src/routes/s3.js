const express = require('express');
const router = express.Router();
const bucketController = require('../controllers/bucketController');

router.get('/api/s3json', bucketController.getJsonFromS3);

module.exports = router;