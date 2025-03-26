const express = require('express');
const { registerUser, loginUser, updateUser} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/users/:id', authMiddleware, updateUser);

module.exports = router;