/* Impoting Libraries */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


/* Import Routes */

const authRoute = require('./routes/auth');
dotenv.config();

/* Connecting to database */

mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log('Connect to Database')
);

/* Middlwares */

app.use(express.json());

/* Route Middlewares */

app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server up and Running on port 3000"));

