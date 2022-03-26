const jwt = require('jwt-simple');
const moment = require('moment');
const { secretPhrase } = require('../config/config');

const checkToken = (req, res, next) => {
  const { headers } = req;
  if (!headers['user-token']) {
    return res.json({ error: 'Token is required' });
  }

  const userToken = headers['user-token'];

  try {
    const encode = jwt.decode(userToken, secretPhrase);
    if (encode.expiredAt < moment().unix()) {
      return res.json({ error: 'Token has expired' });
    }
    next();
  } catch (error) {
    return res.json({ error: 'Incorrect token' });
  }
};

module.exports = checkToken;
