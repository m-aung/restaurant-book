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
    const filters = {};
    // cuisine filter
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      // zipcode filter
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      // name filter
      filters.name = req.query.name;
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
  // get restaurants by id
  static async getRestaurantById(req, res) {
    try {
      const id = req.params.id || {};
      const restaurant = await RestaurantsDAO.getRestaurantByID(id);
      if (!restaurant) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(restaurant);
    } catch (err) {
      console.log(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  }

  //get all cuisines
  static async getAllCuisines(_, res) {
    try {
      const cuisines = await RestaurantsDAO.getCuisines();
      res.json(cuisines);
    } catch (err) {
      console.log(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  }
}
