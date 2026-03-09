const mongoose = require('mongoose');
require('dotenv').config();

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error.message);
  }
}

module.exports = connectDatabase;