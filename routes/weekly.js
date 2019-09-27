const express = require('express');
const { getWeeklyTodos } = require('../db/database.js');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    getWeeklyTodos(db, req.cookies.userID)
      .then(data => res.json({data}))
      .catch(err => console.log(err));
  });
  return router;
};