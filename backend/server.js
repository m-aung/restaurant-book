// import necessary modules
import express from 'express';
import cors from 'cors';

// import necessary modules from files
import restaurants from './api/restaurants.route.js'; // need to add js extension to work as module
import authentication from './api/authentication.route.js';

const app = express(); // serving the server

// intializing
app.use(cors());
app.use(express.json()); // parsing replacement of body-parser which is a part of express

// serving the
app.use('/api/v1/restaurants', restaurants);
app.use('/api/login', authentication);
app.use('*', (req, res) => res.status(404).json({ error: 'Page Not Found' }));

//exporting the module
export default app;
