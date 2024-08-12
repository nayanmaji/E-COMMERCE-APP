require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./mongoDB');
const Cart = require('./Router/Cart');
const Customer = require('./Router/Customer');
const Order = require('./Router/Order');
const Product =require('./Router/Product');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/cart',Cart);
app.use('/customer',Customer);
app.use('/order',Order);
app.use('/product',Product);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
