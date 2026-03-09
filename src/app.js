const express = require('express');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use(orderRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API de pedidos em funcionamento'
  });
});

module.exports = app;