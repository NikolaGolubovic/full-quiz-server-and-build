const errorHandler = (error, req, res, next) => {
  console.log("error", error.message);
  if (error) {
    res.status(400).json({ error: error.message });
  }
  next(error);
};

const auth = (request, _, next) => {
  const authorization = request.get("authorization");
  if (!authorization) {
    throw new Error("There is some problem with token");
  }
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  return next();
};

module.exports = {
  errorHandler,
  auth,
};
