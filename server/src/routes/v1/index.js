const Router = require("express");
const userRoutes = require("./userRoute/index");
const policyRoutes = require('./policyRoute/index')

const router = Router();

router.use("/user", userRoutes);
router.use("/policy", policyRoutes);

module.exports = router;
