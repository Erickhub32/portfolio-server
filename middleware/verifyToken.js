const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    const validTokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = validTokenPayload;
    next()

  } catch (error) {
    res.status(401).json('Token is not valid')
  }
}

module.exports = isAuthenticated 