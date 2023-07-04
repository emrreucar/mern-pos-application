const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const logger = require('morgan');

// !routes
const categoryRoute = require('./routes/categories.js');
const productRoute = require('./routes/products.js');
const billRoute = require('./routes/bills.js');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


//! mongodb connect
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};


//! middlewares
app.use(cors());
app.use(express.json());
app.use(logger("dev"));


app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/bills', billRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);



//! server listen
app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}... `);
});
