const express = require('express');
const routerCars = require('./routers/routerCars');
const routerUsers = require('./routers/routerUser');
const conn = require('./database/connection');
const cors = require('cors');
require('dotenv/config');

const app = express();


//middlewares
app.use(express.json());
app.use('/api/v1/cars', routerCars);
app.use('/api/v1/users', routerUsers);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));

//Db connection
//token verification

conn.connectToDb()

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));