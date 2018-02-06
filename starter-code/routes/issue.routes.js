const express = require('express');
const issueController = require('../controllers/issue.controller');
const router = express.Router();

router.get('/:id', issueController.getIssue);

module.exports = router;