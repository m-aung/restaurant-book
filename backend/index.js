// importing modules
import mongodb from 'mongodb';
import dotenv from 'dotenv';

// import from files
import app from './server.js';
import RestaurantsDAO from './dao/restaurantsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';

// initializing dotenv
dotenv.config();

// setting up DB connection
const db = mongodb.MongoClient;

const PORT = process.env.PORT || 8080;
db.connect(process.env.URL, {
  poolSize: 50, // only 50 people
  wtimeout: 2500, // 2.5 sec
  useUnifiedTopology: true,
  useNewUrlParse: true, // reload the string
})
  .then(async (client) => {
    // initial reference
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.stack); //
    process.exit(1);
  });
