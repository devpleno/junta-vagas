const express = require("express");
const router = express.Router();

const newsletterController = require("../controllers/newsletterController");

router.post("/register", newsletterController.register);

router.get(
  "/emailConfirmation/:token?",
  newsletterController.emailConfirmation
);

module.exports = router;
