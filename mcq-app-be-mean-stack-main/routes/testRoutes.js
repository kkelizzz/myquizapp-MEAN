const express = require('express');
const router = express.Router();
const Test = require('../models/test');

// Create a new test
router.post('/', async (req, res) => {
  try {
    const { name, timeLimit } = req.body;
    const newTest = new Test({ name, timeLimit });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create test', error: err.message });
  }
});

// Get all tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch tests', error: err.message });
  }
});

// Get a specific test by ID
router.get('/:id', async (req, res) => {
    try {
      const test = await Test.findById(req.params.id);
      if (!test) return res.status(404).json({ message: 'Test not found' });
      res.json(test);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Update a test (including time limit)
router.put('/:id', async (req, res) => {
  try {
    const { name, timeLimit } = req.body;
    const updatedTest = await Test.findByIdAndUpdate(req.params.id, { name, timeLimit }, { new: true });
    res.status(200).json(updatedTest);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update test', error: err.message });
  }
});

// Delete a test
router.delete('/:id', async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Test deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete test', error: err.message });
  }
});

module.exports = router;
