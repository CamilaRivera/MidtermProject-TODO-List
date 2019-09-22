const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('category');
  });
  
  router.post('/', (req, res) => {
  });

  return router;
};



