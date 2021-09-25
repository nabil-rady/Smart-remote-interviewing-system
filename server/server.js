const express = require("express");
const bodyParser = require('body-parser');
const sequelize = require("./util/db");

const app = express();
app.use(bodyParser.json());


/* connect to db, and creat tables for our models IF NOT EXSISTS,
but when we set force: true, it over wites the existing tables,
we do this on development only when we want to write the new editing to the DataBase.
*/
sequelize.sync(
    // { force: true }
).then(result => {
    // Setup the server.
    const port = 8080;
    app.listen(port, () => console.log(`Server is runing on port ${port}`));
}).catch(err => console.log(err));