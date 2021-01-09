const errorHandler = (error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status).json({ message });
};

module.exports = errorHandler;
