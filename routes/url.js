const express = require('express')

const router = express.Router()

const {generateShortUrl, getUrlById, getAllUrls, getAnalyticsOfUrlById} = require('../controllers/url')

router.post('/', generateShortUrl)
router.get('/', getAllUrls)
router.get('/:id', getUrlById)
router.get('/analytics/:id', getAnalyticsOfUrlById)

module.exports = router