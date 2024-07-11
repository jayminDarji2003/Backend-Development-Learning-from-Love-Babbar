const express = require('express');
const { register, login, users } = require('../controllers/userControllers');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/users", auth, isAdmin, users)

module.exports = router;