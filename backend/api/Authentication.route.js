import http from '../../frontend/http-common';
import jwt from ('jsonwebtoken');
import bcrypt from ('bcrypt');

const saltRounds = 10;
const jwtSecret = 'admin-101';
const Authentication = {};

authController.signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      log: 'Error in authController.signup',
      status: 401,
      message: 'Missing email or password in request body',
    });
  }

  bcrypt.hash(password, saltRounds).then((hash) => {
    const query = `
        INSERT INTO users(email, password)
        VALUES ($1, $2)
        RETURNING email, id`;

    db.query(query, [email, hash]).then((data) => {
      res.locals.user = data.rows[0];
      return next();
    });
  });
};

//function to login a new user and verify password is correct
authController.login = (req, res, next) => {
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
authController.addJWT = (req, res, next) => {
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
authController.verifyUser = (req, res, next) => {
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
authController.logout = (req, res, next) => {
  res.cookie('jwt', null);
  return next();
};

module.exports = authController;
