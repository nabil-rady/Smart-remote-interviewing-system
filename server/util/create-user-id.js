const customId = require('custom-id');

const User = require('../models/user');

// Create a unique id
module.exports = (name, email) => {
  return User.findAll({
    attributes: ['userID'],
  }).then((users) => {
    const oldIds = users.map((user) => user.dataValues.userID);
    let newId, exist;
    do {
      exist = false;
      newId = customId({
        name: name,
        email: email,
      });

      for (let id of oldIds) {
        if (id === newId) {
          exist = true;
          break;
        }
      }
    } while (exist);
    return newId;
  });
};
