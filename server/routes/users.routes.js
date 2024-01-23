const {userRegistration, userLogin} = require('../controller/users.controller');
const express = require('express')
const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegistration);

module.exports = router;
