const jwt = require('jsonwebtoken');

module.exports = (userId, secretKey, expirationTime) => {
  const token = jwt.sign(
    // create the token
    {
      // user's info stored in the token
      userId: userId,
    },
    secretKey, // SECRET KEY
    {
      expiresIn: expirationTime,
    }
  );
  return token;
};
