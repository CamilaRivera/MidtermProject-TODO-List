const express = require('express');
const {  getCompleteTodos } = require('../db/database.js');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    getCompleteTodos(db, req.cookies.userID)
      .then(data => res.json({data}))
      .catch(err => console.log(err));
  });


  return router;
};