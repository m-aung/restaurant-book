// importing module from files
import ReviewsDAO from '../../dao/reviewsDAO.js';

// creating Review class
export default class ReviewsController {
  // post review
  static async postReview(req, res) {
    try {
      // getting restaurant_id, review id, user info from req.body
      // use more secure method with authentication later
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id, // replace this with cookie/token later
      };
      // creating date instance
      const date = new Date();

      // add review
      await ReviewsDAO.addReview(restaurantId, userInfo, review, date);
      //response the status code and sand json obj
      res.statusCode(200).json({ status: 'The review successfully added!' });
    } catch (err) {
      // error handling
      res.status(500).json({ error: err.message });
    }
  }

  //update the review
  static async updateReview(req, res) {
    try {
      // get review_id, text from req.body
      const reviewId = req.body.review_id;
      const text = req.body.text;
      // create new date instance
      const date = new Date();

      //query to database
      await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id, // replace this with cookie/token later
        text,
        date
      ).catch((err) => {
        res.status(400).json({ error });
      });

      // if (reviewResponse.modifiedCount === 0) {
      //   throw new Error(
      //     'unable to update review - user may not be original poster'
      //   );
      // }
      // response to client
      res.statusCode(200).json({ status: 'Successfully updated!' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // delete review
  static async deleteReview(req, res) {
    try {
      // get review_id, user_id from req.body
      const reviewId = req.query.id;
      const userId = req.body.user_id;
      // console.log(reviewId);
      // query to database
      await ReviewsDAO.deleteReview(reviewId, userId);
      // response back to client

      res.statusCode(200).json({ status: 'Successfully deleted!' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
