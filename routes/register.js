const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('register');
  });
  
  router.post('/', (req, res) => {
    const {userName, email, password} = req.body;
    const values = [userName, email, password];
    const queryString = `
      INSERT INTO users (name, email, phone_number, password, avatar_url, birth_date)
    `;
  });

  return router;
};



