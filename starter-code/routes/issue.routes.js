const express = require('express');
const issueController = require('../controllers/issue.controller');
const secure = require('../configs/passport.config');
const router = express.Router();

router.get('/:id', issueController.show);
router.get('/new', issueController.new);
router.post('/new', issueController.doNew);
router.get('/edit/:id', issueController.edit);
router.post('/edit/:id', issueController.doEdit);
router.get('/delete/:id', secure.isMe, issueController.delete)

module.exports = router;