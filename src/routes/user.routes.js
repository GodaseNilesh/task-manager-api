const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

// role based api test
router.get(
  "/admin-only",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  },
);

router.get(
  "/common",
  authMiddleware,
  authorizeRoles("admin", "user"),
  (req, res) => {
    res.json({ message: "All logged-in users allowed" });
  },
);

module.exports = router;
