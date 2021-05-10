import mongodb from 'mongodb';

let isLoggedIn = false;
export default class UsersDAO {
  static async injectDB(conn) {
    // when the data is already injected
    if (isLoggedIn) {
      return;
    }
    //connect to the collection of the database
    try {
      userData = await conn.db(process.env.DB_NAME).collection('users');
      isLoggedIn = true;
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`
      );
    }
  }
  static async addUser({
    firstName,
    lastName,
    email,
    password,
    admin = false,
    superAdmin = false,
    date = new Date()
  }){
  try {
    // instantiate user.name, user_id, data, text, restaurant_id
    const newUser = {
      username: email,
      password,
      user_id: user._id,
      date: date,
      admin,
      superAdmin,
      firstName,
      restaurant_id: ObjectId(restaurantId), // restaurantId = id from req.body
    };
    // insert into review collection
    return await reviews.insertOne(newUser);
  } catch (err) {
    console.error(`Unable to post review: ${err}`);
    return { error: err };
  }
}
static updateReview(reviewId, userId, text, date) {
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

// update the review


