const express = require('express');

const reviewController = require('../../controllers/review.controller');

const router = express.Router();
// getting all reviews
router.route('/').get(reviewController.getAllReviews);

// add a review
router.route('/addreview/:email').post(reviewController.addReview);

// delete a single review
router.route('/:id').delete(reviewController.deleteReview);

module.exports = router;
