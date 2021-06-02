// importing module
import mongodb from 'mongodb';

// instantiation
let restaurantsData;

// creating DAO class
export default class RestaurantsDAO {
  // connecting database data
  static async injectDB(conn) {
    // when the data is already injected
    if (restaurantsData) {
      return;
    }
    //connect to the collection of the database
    try {
      restaurantsData = await conn
        .db(process.env.DB_NAME)
        .collection('restaurants');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
    }
  }

  // getting data from the database default is {}
  static async getRestaurants({
    filters = null, // filtering
    page = 0, // cur num of page
    restaurantsPerPage = 20, // limit of data per page
  } = {}) {
    let query;
    // if there is a filter
    // use if (props in object) checking props in object to optimize the loop to search in object/array
    if (filters) {
      //for name
      if ('name' in filters) {
        // $text refers to text in collections and $seacrch is search operator
        query = { $text: { $search: filters['name'] } };
      }
      // for cuisine
      else if ('cuisine' in filters) {
        // $eq refers to equal operator
        query = { cuisine: { $eq: filters['cuisine'] } };
      }
      //for zipcode
      else if ('zipcode' in filters) {
        query = { 'address.zipcode': { $eq: filters['zipcode'] } };
      }
    }

    // getting restaurants data
    let data;
    // query to the db
    try {
      // SELECT * from restaurants where query
      data = await restaurantsData.find(query);
    } catch (e) {
      console.error(`Unable to get data from restaurants line 62:, ${e}`);
      return { restaurants: [], totalRestaurants: 0 };
    }

    const displayData = data
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page); // limit data per page and skip to the page where the data is located

    try {
      // covert the display per page into array
      const restaurants = await displayData.toArray();
      // count the documents to get the total number of restaurants
      const totalRestaurants = await restaurantsData.countDocuments(query);

      return { restaurants, totalRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { restaurants: [], totalRestaurants: 0 };
    }
  }
  static async getRestaurantByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'reviews',
            let: {
              id: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$restaurant_id', '$$id'],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviews: '$reviews',
          },
        },
      ];
      return await restaurantsData.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }

  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await restaurantsData.distinct('cuisine');
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
