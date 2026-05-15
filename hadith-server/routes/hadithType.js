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
    console.log(req.body);
    try {
      const newHadithType = await HadithTypeList.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          hadithType: newHadithType
        }
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error
      })
    }
  })

module.exports = router
