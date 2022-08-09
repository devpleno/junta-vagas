const express = require("express");
const router = express.Router();

const jobsPaginatedController = require("../controllers/jobsPaginatedController");

router.get("/getAllJobs", jobsPaginatedController.paginatingJobs);

module.exports = router;