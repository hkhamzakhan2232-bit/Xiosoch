// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  console.error('Error:', err.message || err); // Optional: log full error object
  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};