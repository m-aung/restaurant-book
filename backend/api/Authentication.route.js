import http from '../../frontend/http-common';

import express from 'express';
import UsersController from './controller/UsersController.js';

// initializing express router
const router = express.Router();

//routing the routes
//get restaurants route
router.route('/login').get(UsersController.login);
// get restaurant by id
router.route('/signup').get(UsersController.signup);

//review route-chainable routes
// post, put, delete
router
  .route('/signup')
  .post(UsersController.singup)
  .put(UsersController.updateUser)
  .delete(UsersController.deleteUser);

// exporting the routes as router
export default router;
