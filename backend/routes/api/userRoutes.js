const router = require("express").Router();
const {
	createUser,
	updateUser,
	deleteUser,
	getSingleUser,
	login,
	logout,
} = require("../../controllers/userController");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createUser);

router.route("/").put(authMiddleware, updateUser);

router.route("/").delete(authMiddleware, deleteUser);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(authMiddleware, getSingleUser);

module.exports = router;
