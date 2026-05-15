const express = require('express')
const HadithTypeList = require('../models/HadithType')
const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const hadithType = await HadithTypeList.find({})
    res.send({
      status: 'success',
      hadithType: hadithType
    })
  } catch (error) {
    res.send({
      status: 'fail',
      message: error
    })
  }
})

// ****************************

router.post('/', async (req, res) => {
  try {
    const newHadithType = await HadithTypeList.create(req.body)
    res.status(201).json({ status: 'success', data: { hadithType: newHadithType } })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await HadithTypeList.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ status: 'fail', message: 'Not found' })
    res.json({ status: 'success', data: { hadithType: updated } })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await HadithTypeList.findByIdAndDelete(req.params.id)
    res.json({ status: 'success', data: null })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
})

module.exports = router
