const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.render('login');
  });
  
  router.post('/', (req, res) => {
  
  });

  return router;
};



