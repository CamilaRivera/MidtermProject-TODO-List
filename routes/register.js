const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('register');
  });
  
  router.post('/', (req, res) => {
    const {userName, email, phoneNumber, password, avatar, date} = req.body;
    const values = [userName, email, phoneNumber, password, avatar, date];
    const queryString = `
      INSERT INTO users (name, email, phone_number, password, avatar_url, birth_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    db.query(queryString, values)
      .then(data => {
        const user = data.rows;
        res.json({user});
      })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  });
  return router;
};