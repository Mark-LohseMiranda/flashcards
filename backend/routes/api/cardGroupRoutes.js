const router = require("express").Router();
const {
	createCardGroup,
	getCardGroup,
	updateCardGroup,
	addCard,
	deleteCardGroup,
	updateCard,
	deleteCard,
} = require("../../controllers/cardGroupController");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(authMiddleware, createCardGroup);

router.route("/").get(authMiddleware, getCardGroup);

router.route("/:cardGroupId").put(authMiddleware, updateCardGroup);

router.route("/addcard/:cardGroupId").post(authMiddleware, addCard);

router.route("/:cardGroupId").delete(authMiddleware, deleteCardGroup);

router
	.route("/updatecard/:cardGroupId/:cardId")
	.put(authMiddleware, updateCard);

router.route("/deletecard/:cardGroupId/:cardId").delete(authMiddleware, deleteCard);

module.exports = router;
