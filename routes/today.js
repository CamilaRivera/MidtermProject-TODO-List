const express = require('express');
const { getTodayTodos } = require('../db/database.js');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    getTodayTodos(db, req.cookies.userID)
      .then(data => res.json({data}))
      .catch(err => console.log(err));
  });
  return router;
};