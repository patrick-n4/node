const express = require("express");
const login = require("../controllers/handleLogin");
const router = express.Router();

router.route('/').post(login);

module.exports = router;