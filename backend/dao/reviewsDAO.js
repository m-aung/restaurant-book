// import modules
import mongodb from 'mongodb';

// intializing
const ObjectId = mongodb.ObjectID;

let reviews;

export default class ReviewsDAO {
  // connecting to db
  static async injectDB(conn) {
    // if the review already has data, return
    if (reviews) {
      return;
    }
    //else
    try {
      // connect to reviews database
      reviews = await conn.db(process.env.DB_NAME).collection('reviews');
    } catch (err) {
      // error handling
      console.error(
        `Unable to establish collection handles in reviewsDAO: ${err}`
      );
    }
  }

  // add new review
  static async addReview(restaurantId, user, review, date) {
    try {
      // instantiate user.name, user_id, data, text, restaurant_id
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: ObjectId(restaurantId), // restaurantId = id from req.body
      };
      // insert into review collection
      return await reviews.insertOne(reviewDoc);
    } catch (err) {
      console.error(`Unable to post review: ${err}`);
      return { error: err };
    }
  }

  // update the review
  static async updateReview(reviewId, userId, text, date) {
    try {
      // query to database
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } } // filter using set operator
      );
      // return query response
      return updateResponse;
    } catch (err) {
      console.error(`Unable to update review: ${err}`);
      return { error: err };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
