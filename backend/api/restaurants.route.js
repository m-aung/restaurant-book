// import modules
import express from 'express';
import RestaurantsController from './controller/RestaurantsController.js';
import ReviewController from './controller/ReviewController.js';

// initializing express router
const router = express.Router();

//routing the routes
//get restaurants route
router.route('/').get(RestaurantsController.getRestaurants);
//review route-chainable routes
// post, put, delete
router
  .route('/review')
  .post(ReviewController.postReview)
  .put(ReviewController.updateReview)
  .delete(ReviewController.deleteReview);

// exporting the routes as router
export default router;
