const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require('../middlewares/auth.middleware');

router.post("/signup", userController.signup);
router.post("/login", userController.login);

//test purpose only
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route',
    user: req.user
  });
});

module.exports = router;
