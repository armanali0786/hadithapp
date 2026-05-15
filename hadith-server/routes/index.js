const express = require('express')
const router = express.Router()
const questions = require('./questions')
const hadithtypes = require('./hadithType')
const cardlists = require('./cardList')

const hadithlist = require('./hadithList')

router.use('/questions', questions)

router.use('/hadith-type', hadithtypes);

router.use('/cardlists', cardlists)

router.use('/hadith-list', hadithlist)

module.exports = router
