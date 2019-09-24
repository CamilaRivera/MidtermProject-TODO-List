const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post('/', (req, res) => {
    res.clearCookie('userID');
    res.redirect('/login');
  });

  return router;
};

