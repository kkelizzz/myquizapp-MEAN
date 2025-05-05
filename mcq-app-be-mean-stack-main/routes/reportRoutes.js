const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/submit', reportController.submitTest);


router.get('/rank/:testId/:userId', reportController.getUserRankInTest);

router.get('/test/:testId', reportController.getTestReports);

router.get('/tests', reportController.getAllTestsWithReports);

router.get('/:userId', reportController.getReportsByUser);

router.delete('/delete/:_id', reportController.deleteReport);

module.exports = router;
