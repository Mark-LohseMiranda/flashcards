const router = require("express").Router();
const userRoutes = require("./userRoutes");
const cardGroupRoutes = require('./cardGroupRoutes')

router.use("/users", userRoutes);
router.use("/cardgroup", cardGroupRoutes)

module.exports = router;
