const express = require('express');
const issueController = require('../controllers/issue.controller');
const secure = require('../configs/passport.config');
const router = express.Router();

router.get('/new', secure.isAuthenticated, issueController.select);
router.get('/new/:type', secure.isAuthenticated, issueController.new);
router.post('/new', secure.isAuthenticated, issueController.doNew);
router.get('/:id', issueController.show);
router.get('/edit/:id', issueController.edit);
router.post('/edit/:id', issueController.doEdit);
router.get('/delete/:id', secure.isMe, issueController.delete);

module.exports = router;