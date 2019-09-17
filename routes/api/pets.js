const express = require("express");
const router = express.Router();

// @route     GET api/pets
// @desc      Test route
// @access    Public
router.get("/", (req, res) => res.send("Pets route"));

module.exports = router;
