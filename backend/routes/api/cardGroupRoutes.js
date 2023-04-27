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

// Get CardGroups

router.route("/").get(authMiddleware, getCardGroup);

// Create CardGroup

router.route("/").post(authMiddleware, createCardGroup);

// Update CardGroup

router.route("/:cardGroupId").put(authMiddleware, updateCardGroup);

// Delete Card Group

router.route("/:cardGroupId").delete(authMiddleware, deleteCardGroup);

// Create Card

router.route("/addcard/:cardGroupId").post(authMiddleware, addCard);

// Update Card

router
  .route("/updatecard/:cardGroupId/:cardId")
  .put(authMiddleware, updateCard);

// Delete Card

router
  .route("/deletecard/:cardGroupId/:cardId")
  .delete(authMiddleware, deleteCard);

module.exports = router;
