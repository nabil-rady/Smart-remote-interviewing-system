if (process.env.MODE === 'production') {
  require('dotenv').config();
}

const sequelize = require('./utils/db');
const app = require('./server').app;

sequelize
  .sync({
    // force: true,
  })
  .then((result) => {
    // Setup the server.
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Server is runing on port ${port}`));
  })
  .catch((err) => console.log(err));
