// importing modules from files
import RestaurantsDAO from '../../dao/restaurantsDAO.js';

export default class RestaurantsController {
  // getting Data
  static async getRestaurants(req, res, next) {
    // getting page num ber query parsing into Int with base 10: default is 20
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    // setting up for filters
    const filters = {}; // default
    switch (Object.keys(filters).length) {
      //for cuisine case
      case req.query.cuisine:
        {
          filters.cuisine = req.query.cuisine;
        }
        break;
      // for zipcode case
      case req.query.zipcode:
        {
          filters.zipcode = req.query.zipcode;
        }
        break;
      // for name case
      case req.query.name:
        {
          filters.name = req.query.name;
        }
        break;
      default:
        break;
    }

    // destructuring
    const {
      restaurants,
      totalRestaurants,
    } = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    });

    let response = {
      restaurants,
      page,
      filters,
      restaurantsPerPage,
      totalRestaurants,
    };
    res.json(response);
  }
}
