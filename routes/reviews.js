const express = require('express')
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync')
const {validateReviews,isLoggedIn,isReviewAuthor} = require('../middleware.js')
const reviews = require('../controllers/reviews.js')

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

router.post('/',isLoggedIn,validateReviews,catchAsync(reviews.createReview))

module.exports = router