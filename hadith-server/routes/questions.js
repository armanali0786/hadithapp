const express = require('express')
const Questions = require('../models/Questions')
const FeatureList = require('../models/HadithType')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const questions = await Questions.find({})

    res.send({
      status: 'success',
      results: questions.length,
      data: {
        questions
      }
    })
  } catch (error) {
    res.send({
      status: 'fail',
      message: error
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const question = await Questions.findOne({ _id: id })

    res.send({
      status: 'success',
      data: {
        question
      }
    })
  } catch (error) {
    res.send({
      status: 'fail',
      message: error
    })
  }
})

router.post('/', async (req, res) => {
  console.log(req.body);

  try {
    const newQuestion = await Questions.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        question: newQuestion
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
})



router.patch('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const updateQuestion = await Questions.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.send({
      status: 'success',
      data: {
        question: updateQuestion
      }
    })
  } catch (error) {
    res.send({
      status: 'fail',
      message: error
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Questions.findByIdAndDelete(id)

    res.send({
      status: 'success',
      data: null
    })
  } catch (error) {
    res.send({
      status: 'fail',
      message: error
    })
  }
})





module.exports = router
