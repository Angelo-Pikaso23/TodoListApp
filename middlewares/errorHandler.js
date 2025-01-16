const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: "Error interno del servidor" });
  };
  
  module.exports = errorHandler;
  