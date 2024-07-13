const Router = require("express");
const policyCtrl = require("../../../controller/v1/policy");
const router = Router();
const auth = require('../../../middleware/auth')
router.get("/get-all-policies", auth ,policyCtrl.getAllPolicies);

module.exports = router;
