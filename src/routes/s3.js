var express = require("express");
var router = express.Router();

var bucketController = require("../controllers/bucketController");

router.get("/s3json", function (req, res) {
    bucketController.getJsonFromS3(req, res);
});

module.exports = router;