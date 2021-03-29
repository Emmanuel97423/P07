const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/like.controller");

router.post("/:id", likeCtrl.like);

module.exports = router;