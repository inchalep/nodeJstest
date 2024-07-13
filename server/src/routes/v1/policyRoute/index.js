const Router = require("express");
const policyCtrl = require("../../../controller/v1/policy");
const router = Router();
const auth = require("../../../middleware/auth");
const validate = require("../../../middleware/validate");
const validationSchemas = require("../../../validation/index");

router.get("/get-all-policies", auth, policyCtrl.getAllPolicies);
router.post(
  "/calculate-policy-projected-benefits",
  auth,
  validate(validationSchemas.illustrationSchema),
  policyCtrl.calculateBenifitIllustration
);

module.exports = router;
