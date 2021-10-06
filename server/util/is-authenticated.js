const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('Authorization'); // get the Authorization header from the request.
  if (!token) {
    // if the header is not attached.
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'ThisIsTheTokenSecretKey'); // decode the token and verify it.
  } catch (err) {
    // if the verificatin faild.
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    // if the decodedToken is undefined.
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId; // attach the user id to the req, if the token is verified.
  next();
};
