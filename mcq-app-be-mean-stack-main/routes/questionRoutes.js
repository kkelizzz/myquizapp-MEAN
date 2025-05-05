const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Create a new question
router.post('/', async (req, res) => {
  try {
    const { testId, questionText, options, correctAnswer } = req.body;
    const newQuestion = new Question({ testId, questionText, options, correctAnswer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create question', error: err.message });
  }
});

// Get questions by test
router.get('/test/:testId', async (req, res) => {
  try {
    const questions = await Question.find({ testId: req.params.testId });
    res.status(200).json(questions);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch questions', error: err.message });
  }
});

//Get question by id
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch question', error: err.message });
  }
});

// Update a question
router.put('/:id', async (req, res) => {
  try {
    const { questionText, options, correctAnswer } = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, { questionText, options, correctAnswer }, { new: true });
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update question', error: err.message });
  }
});

// Delete a question
router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Question deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete question', error: err.message });
  }
});

module.exports = router;
