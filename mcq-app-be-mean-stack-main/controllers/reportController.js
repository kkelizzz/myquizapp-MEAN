const Report = require('../models/report');
const Question = require('../models/question');
const Test = require('../models/test');

exports.submitTest = async (req, res) => {
  try {
    const { userId, testId, answers } = req.body;

    const questions = await Question.find({ testId });
    let score = 0;

    questions.forEach(q => {
      const userAnswer = answers[q._id];
      if (userAnswer && userAnswer === q.correctAnswer) {
        score++;
      }
    });

    const report = new Report({
      userId,
      testId,
      score,
      total: questions.length
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReportsByUser = async (req, res) => {
  const userId = req.params.userId;
  const reports = await Report.find({ userId }).populate('testId', 'name date');
  res.json(reports);
};

exports.getTestReports = async (req, res) => {
  try {
    const reports = await Report.find({ testId: req.params.testId }).populate('userId', 'name');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getUserRankInTest = async (req, res) => {
//   try {
//     const { testId, userId } = req.params;
//     const allReports = await Report.find({ testId }).sort({ score: -1 });

//     const rank = allReports.findIndex(report => report.userId.toString() === userId) + 1;

//     res.json({ rank});
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getUserRankInTest = async (req, res) => {
  try {
    const { testId, userId } = req.params;
    const allReports = await Report.find({ testId }).sort({ score: -1 });

    let rank = 1;
    let lastScore = null;
    let currentRank = rank;

    // Loop through the sorted reports and calculate rank
    for (let i = 0; i < allReports.length; i++) {
      const report = allReports[i];

      if (report.score !== lastScore) {
        // If the score is different from the last one, update rank
        currentRank = i + 1;
        lastScore = report.score;
      }

      // Assign rank to the user
      if (report.userId.toString() === userId) {
        rank = currentRank;
        break;  // Once we find the user, we can exit the loop
      }
    }

    res.json({ rank });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllTestsWithReports = async (req, res) => {
  try {
    const tests = await Report.find().populate('testId').distinct('testId');
    const testDetails = await Test.find({ _id: { $in: tests } });
    res.status(200).json(testDetails);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tests', error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    // const { reportId } = req.params;

    const report = await Report.findByIdAndDelete(req.params._id);

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
