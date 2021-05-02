// import modules
import express from 'express';
import RestaurantsController from './controller/RestaurantsController.js';
import ReviewsController from './controller/ReviewsController.js';

// initializing express router
const router = express.Router();

//routing the routes
//get restaurants route
router.route('/').get(RestaurantsController.getRestaurants);
// get restaurant by id
router.route('/id/:id').get(RestaurantsController.getRestaurantById);
// get all cuisines
router.route('/cuisines').get(RestaurantsController.getAllCuisines);
//review route-chainable routes
// post, put, delete
router
  .route('/review')
  .post(ReviewsController.postReview)
  .put(ReviewsController.updateReview)
  .delete(ReviewsController.deleteReview);

// exporting the routes as router
export default router;
