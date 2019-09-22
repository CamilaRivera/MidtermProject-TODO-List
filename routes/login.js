const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('login');
  });
  
  router.post('/', (req, res) => {
    const {email, password} = req.body;
    const values = [email, password];
    const queryString = `
      SELECT * FROM users
      WHERE email = $1
      AND password = $2
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



