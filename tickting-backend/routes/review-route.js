const router = require('express').Router()
const checkAuth = require('../middlewares/checkAuth')
const reviewController = require('../controller/reviewController')
const restrictTo = require('../middlewares/restrictTo')

router
    .route('/myReviews')
    .get(checkAuth, reviewController.getCustomerReviews)

router
    .route('/operatorReview/:id')
    .get(checkAuth, restrictTo('admin', 'operator'), reviewController.getOperatorReviews)

router
    .route('/:id')
    .get(checkAuth, reviewController.getReviews)
    .post(checkAuth, reviewController.addReviews)

module.exports = router