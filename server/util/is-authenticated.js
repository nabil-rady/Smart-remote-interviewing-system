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
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // decode the token and verify it.
  } catch (err) {
    // if the token can not be decoded.
    err.message = 'The json web token has been expired';
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    // if the decodedToken is undefined.
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  // attach the user info to the req, if the token is verified.
  req.userId = decodedToken.userId;
  next();
};
