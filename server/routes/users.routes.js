const {userRegistration, userLogin} = require('../controller/users.controller');
const express = require('express')
const router = express.Router();

router.post("/login", userRegistration);
router.post("/register", userLogin);

module.exports = router;
