const express = require("express");
const router = express.Router();

const { getJobsPaginated } = require("../controllers/jobsController");

router.get("/", getJobsPaginated);

module.exports = router;