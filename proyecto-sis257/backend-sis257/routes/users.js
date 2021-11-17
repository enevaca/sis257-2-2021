var express = require('express');
var router = express.Router();
const { generateAccessToken } = require("../controllers/jwt.controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", generateAccessToken);

module.exports = router;
