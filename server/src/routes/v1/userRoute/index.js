const Router = require("express");
const userCtrl = require("../../../controller/v1/user");
const router = Router();
const validationSchemas = require("../../../validation/index");
const validate = require('../../../middleware/validate');

router.post(
  "/registration",
  validate(validationSchemas.registrationSchema),
  userCtrl.registration
);
router.post("/login", userCtrl.login);

module.exports = router;