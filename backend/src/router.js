const express = require("express");

const router = express.Router();
const { verifyToken } = require("./services/jwt");
// Import itemControllers module for handling item-related operations
const roleControllers = require("./controllers/roleControllers");

router.get("/roles", roleControllers.browse);
router.get("/roles/:id", roleControllers.read);

const { hashPwd, verifyPwd } = require("./services/argon");

const userController = require("./controllers/userControllers");

router.post("/register", hashPwd, userController.createUser);
router.post("login", verifyPwd, userController.login);

router.use(verifyToken);

router.get("/users", userController.browse);
router.get("/users/:id", userController.read);
router.post("./users", userController.add);

router.delete("./logout", userController.logout);

module.exports = router;
