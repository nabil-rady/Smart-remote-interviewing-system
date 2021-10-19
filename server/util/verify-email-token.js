const jwt = require('jsonwebtoken');

module.exports = (token) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.mailTOKEN_SECRET); // decode the token and verify it.
  } catch (err) {
    // if the token can not be decoded.
    err.message = 'The verify token has been expired';
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    // if the decodedToken is undefined.
    const error = new Error('Not a valid token.');
    error.statusCode = 500;
    throw error;
  }
  // if the token is verified, return the userId.
  return decodedToken.userId;
};
