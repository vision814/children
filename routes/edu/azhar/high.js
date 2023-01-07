const express = require("express");
const eduController = require("../../../controllers/eduController/azhar/high");
const router = express.Router();
router.get("/", eduController.getStudents);
router.post("/", eduController.importData);

module.exports = router;
