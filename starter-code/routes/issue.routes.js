const express = require('express');
const issueController = require('../controllers/issue.controller');
const secure = require('../middleware/security.middleware');
const router = express.Router();

router.get('/new', secure.isAuthenticated, issueController.select);
router.get('/new/:type', secure.isAuthenticated, issueController.new);
router.post('/new', secure.isAuthenticated, issueController.doNew);
router.post('/search', secure.isAuthenticated, issueController.search);
router.get('/myIssues', secure.isAuthenticated, issueController.myIssues);
router.get('/edit/:id', issueController.edit);
router.post('/edit/:id', issueController.doEdit);
router.post('/delete/:id', secure.isMyIssue, issueController.delete);
router.get('/:id', secure.isAuthenticated, issueController.show);


module.exports = router;