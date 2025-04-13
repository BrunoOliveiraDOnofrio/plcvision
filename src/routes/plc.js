const express = require("express");
const router = express.Router();

const plcController = require("../controllers/plcController");

router.get("/", (req, res) => {
    plcController.get(req, res);
});

module.exports = router;