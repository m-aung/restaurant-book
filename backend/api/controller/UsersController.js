import UsersDAO from '../../dao/usersDAO.js';
import jwt from ('jsonwebtoken');
import bcrypt from ('bcrypt');
import mongodb from ('mongodb');

import UsersDAO from('../../dao/usersDAO.js');

const saltRounds = 12;
const jwtSecret = 'admin-101'; // hash key
const  UsersController = {}


UsersController.signup = (req, res, next) => {
  // do this in front end
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return next({
  //     log: 'Error in authController.signup',
  //     status: 401,
  //     message: 'Missing email or password in request body',
  //   });
  // }

  try {

    // destruction from request object
    const {email, password} = req.body;
   
    // creating date instance
    const date = new Date();

    // add review
    const {userName, _id, token } = await UsersDAO.addUser(email, password, date);
    //response the status code and sand json obj
    res.statusCode(200).json({ status: `Welcome ${userName}!` });
  } catch (err) {
    // error handling
    res.status(500).json({ error: 'Username is already used!' });
  }
  bcrypt.hash(password, saltRounds).then((hash) => {
    const query = mongodb.;

    db.query(query, [email, hash]).then((data) => {
      res.locals.user = data.rows[0];
      return next();
    });
  });
};

//function to login a new user and verify password is correct
UsersController.login = (req, res, next) => {
  const { email, password } = req.body;

  const query = `
    SELECT email, password, id FROM users
    WHERE email = $1`;

  db.query(query, [email])
    .then((data) => {
      // Compare plaintext pass to hash from DB
      bcrypt.compare(password, data.rows[0].password).then((result) => {
        if (result) {
          const user = {
            email: data.rows[0].email,
            id: data.rows[0].id,
          };

          res.locals.user = user;
          return next();
        }

        return next({
          log: 'error authController.login',
          status: 401,
          message: 'invalid email/password combination',
        });
      });
    })
    .catch((error) => {
      return next(error);
    });
};

//function to add JWT and save in client cookies
UsersController.addJWT = (req, res, next) => {
  const { email } = req.body;
  const { id } = res.locals.user;
  jwt.sign({ email, id }, jwtSecret, (err, token) => {
    if (err) {
      return res.status(400).json('error creating jwt');
    }
    // Store jwt in res.cookies
    res.cookie('jwt', token, { httpOnly: true });
    return next();
  });
};

//function to verify JWT token in cookie
UsersController.verifyUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('IN VERIFY', token);
  if (!token) {
    return res.json();
  }

  // Verify Token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (!decoded) return res.json();
    const { email, id } = decoded;
    res.locals.user = { email, id };

    return next();
  });
};

//function to logout user and erase JWT
UsersController.logout = (req, res, next) => {
  res.cookie('jwt', null);
  return next();
};

module.exports = UsersController;
