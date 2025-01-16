process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const routes = require("./routes/TodoRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Configuración de la conexión a MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://admin:TkHt454f0eW1lYAG@cluster0.0ibj6.mongodb.net/TODO_List?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, // Fuerza el uso de TLS
  tlsAllowInvalidCertificates: false, // Asegura que los certificados sean válidos
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1); // Finaliza el proceso si la conexión falla
  });

// Rutas
app.use(routes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
